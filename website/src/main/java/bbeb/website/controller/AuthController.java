package bbeb.website.controller;

import bbeb.website.config.security.jwt.JwtTokenProvider;
import bbeb.website.dto.AuthDTO;
import bbeb.website.dto.TokenDTO;
import bbeb.website.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthService authService;

    @PostMapping("/api/auth/signin")
    public ResponseEntity<TokenDTO> signIn(@RequestBody AuthDTO.SignInRequestDTO dto) {
        TokenDTO token = authService.signIn(dto);

        return ResponseEntity
                .status(token != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
                .body(token);
    }

    @PostMapping("/api/auth/signup")
    public ResponseEntity<AuthDTO.SingUpResponseDTO> signUp(@RequestBody AuthDTO.SingUpRequestDTO dto) {
        AuthDTO.SingUpResponseDTO responseDTO = authService.signUp(dto);

        return ResponseEntity
                .status(responseDTO != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
                .body(responseDTO);
    }

    @PostMapping("/api/auth/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody TokenDTO.refreshForm dto) {
        String refresh = dto.getRefreshToken();
        TokenDTO accessToken = jwtTokenProvider.refreshToken(refresh);

        return ResponseEntity
                .status(accessToken != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
                .body(accessToken);
    }
}
