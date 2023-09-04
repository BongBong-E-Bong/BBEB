package bbeb.website.service;

import bbeb.website.config.exception.CustomException;
import bbeb.website.config.security.jwt.JwtTokenProvider;
import bbeb.website.domain.member.Member;
import bbeb.website.dto.AuthDTO;
import bbeb.website.dto.TokenDTO;
import bbeb.website.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static bbeb.website.config.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;

    public TokenDTO signIn(AuthDTO.SignInRequestDTO dto) {
        String loginId = dto.getLoginId();
        String password = dto.getPassword();

        if (loginId == null || password == null)
            throw new CustomException(USER_NOT_FOUND);

        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginId, password);

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        return jwtTokenProvider.generateToken(loginId);
    }

    public AuthDTO.SingUpResponseDTO signUp(AuthDTO.SingUpRequestDTO dto){
        Member member = dto.toEntity();
        if (member != null){
            if (memberRepository.findDuplicationByLoginId(member.getLoginId()))
                throw new CustomException(LOGIN_ID_DUPLICATED);

            if (memberRepository.findDuplicationByNickname(member.getNickname()))
                throw new CustomException(NICKNAME_DUPLICATED);

            if (memberRepository.findDuplicationByEmail(member.getEmail()))
                throw new CustomException(EMAIL_DUPLICATED);

            member.setPassword(passwordEncoder.encode(member.getPassword()));
            memberRepository.save(member);
            AuthDTO.SingUpResponseDTO responseDTO = new AuthDTO.SingUpResponseDTO();
            responseDTO.setMemberId(member.getId());
            responseDTO.setLoginId(member.getLoginId());
            responseDTO.setNickname(member.getNickname());
            responseDTO.setEmail(member.getEmail());
            return responseDTO;
        }
        else
            throw new CustomException(SERVER_ERROR);
    }
}
