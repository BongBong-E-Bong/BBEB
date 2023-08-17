package bbeb.website.config.security.jwt;

import bbeb.website.config.exception.CustomException;
import bbeb.website.domain.member.Member;
import bbeb.website.dto.TokenDTO;
import bbeb.website.repository.member.MemberRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import static bbeb.website.config.exception.ErrorCode.*;

@Slf4j
@Component
public class JwtTokenProvider {
    private final MemberRepository memberRepository;
    private final Key accessTokenKey;
    private final Key refreshTokenKey;

    public JwtTokenProvider(@Value("${custom.jwt.secret}") String accessTokenSecret,
                            @Value("${custom.jwt.secret}") String refreshTokenSecret,
                            MemberRepository memberRepository) {
        byte[] accessTokenBytes = Decoders.BASE64.decode(accessTokenSecret);
        this.accessTokenKey = Keys.hmacShaKeyFor(accessTokenBytes);

        byte[] refreshTokenBytes = Decoders.BASE64.decode(refreshTokenSecret);
        this.refreshTokenKey = Keys.hmacShaKeyFor(refreshTokenBytes);

        this.memberRepository = memberRepository;
    }

    private boolean hasRefreshToken(String loginId) {
        String refreshToken = memberRepository
                .findRefreshTokenByLoginId(loginId)
                .orElse(null);

        return refreshToken != null;
    }

    private void setRefreshToken(String loginId, String refreshToken) {
        Member member = memberRepository
                .findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(BadRequest));

        member.setRefreshToken(refreshToken);
        memberRepository.save(member);
    }

    public static String getLoginId(Authentication authentication){
        String authorities = authentication
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return authentication.getName();
    }

    public TokenDTO generateToken(String loginId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(BadRequest));

        String authorities = member.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();

        String accessToken = Jwts.builder()
                .setSubject(loginId)
                .claim("auth", authorities) // 권한 정보를 "auth" 클레임으로 추가
                .setExpiration(new Date(now + 24 * 60 * 60 * 1000))
                .signWith(accessTokenKey, SignatureAlgorithm.HS256)
                .compact();

        boolean refreshTokenExists = hasRefreshToken(loginId);

        if (!refreshTokenExists) {
            String refreshToken = Jwts.builder()
                    .setSubject(loginId)
                    .setExpiration(new Date(now + 60L * 60 * 24 * 30 * 1000))
                    .signWith(refreshTokenKey, SignatureAlgorithm.HS256)
                    .compact();

            setRefreshToken(loginId, refreshToken);
        }

        if (member.getRefreshToken() == null) {
            throw new CustomException(BadRequest);
        }

        member.setLoginId(loginId);

        memberRepository.save(member);

        return TokenDTO.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(member.getRefreshToken())
                .build();
    }

    public TokenDTO refreshToken(String refreshToken) {
        try {
            log.info("입력한 값: " + refreshToken);

            if (refreshToken == null) {
                log.info("refreshToken is Null");
                throw new CustomException(BadRequest);
            }

            // 1. 전달된 refreshToken이 유효한 token인지 확인
            Jwts.parserBuilder().setSigningKey(accessTokenKey).build().parseClaimsJws(refreshToken);
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(refreshTokenKey)
                    .build()
                    .parseClaimsJws(refreshToken)
                    .getBody();

            log.info("claims: " + claims);

            String loginId = claims.getSubject();
            log.info("loginId 값이 " + loginId + "인 유저에 대한 refresh token을 확인합니다.");

            // 2. DB에서 해당 유저의 refreshToken을 가져옴
            log.info("DB 확인을 시작합니다.");

            String dbRefreshToken = memberRepository.findRefreshTokenByLoginId(loginId).orElse(null);
            log.info("DB 확인이 완료되었습니다. DB 내 refresh token 값: " + dbRefreshToken);

            if (dbRefreshToken == null) {
                throw new CustomException(SERVER_ERROR);
            }

            log.info(String.valueOf(dbRefreshToken.equals(refreshToken)));

            // 3. refreshToken과 DB에서 가져온 refreshToken 값을 비교
            if (!dbRefreshToken.equals(refreshToken)) {
                throw new CustomException(INVALID_JWT_TOKEN);
            }

            // 4. Authentication 객체를 가져와, 새로운 토큰 생성
            return generateToken(claims.getSubject());

        } catch (SecurityException | MalformedJwtException e){
            log.info("Invalid JWT Token", e);
            throw new CustomException(INVALID_JWT_TOKEN);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token", e);
            throw new CustomException(EXPIRED_JWT_TOKEN);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token", e);
            throw new CustomException(UNSUPPORTED_JWT_TOKEN);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.", e);
            throw new CustomException(NON_LOGIN);
        }
    }

    // JWT 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
    public Authentication getAuthentication(String accessToken) {
        // 토큰 복호화
        Claims claims = parseClaims(accessToken);

        log.info(claims.toString());
        if (claims.get("auth") == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        // 클레임에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("auth").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        // UserDetails 객체를 만들어서 Authentication 리턴
        UserDetails principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    // 토큰 정보를 검증하는 메서드
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(accessTokenKey).build().parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e){
            log.info("Invalid JWT Token", e);
            throw new CustomException(INVALID_JWT_TOKEN);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token", e);
            throw new CustomException(EXPIRED_JWT_TOKEN);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token", e);
            throw new CustomException(UNSUPPORTED_JWT_TOKEN);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.", e);
            throw new CustomException(NON_LOGIN);
        }
    }

    private Claims parseClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(accessTokenKey).build().parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
