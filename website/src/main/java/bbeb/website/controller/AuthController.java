package bbeb.website.controller;

import bbeb.website.config.exception.CustomException;
import bbeb.website.config.exception.ErrorResponse;
import bbeb.website.config.security.jwt.JwtTokenProvider;
import bbeb.website.dto.AuthDTO;
import bbeb.website.dto.TokenDTO;
import bbeb.website.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(
            summary = "로그인 API",
            description = "로그인 할 때 사용하는 API 입니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "로그인 성공!",
                    content = @Content(schema = @Schema(implementation = TokenDTO.class))),
            @ApiResponse(
                    responseCode = "404",
                    description = "일치하는 유저 정보 없음",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping("/api/auth/signin")
    public ResponseEntity<TokenDTO> signIn(@RequestBody AuthDTO.SignInRequestDTO dto) {
        TokenDTO token = authService.signIn(dto);

        return ResponseEntity
                .status(token != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
                .body(token);
    }

    @Operation(
            summary = "회원가입 API",
            description = "회원가입 할 때 사용하는 API 입니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "회원가입 성공!",
                    content = @Content(schema = @Schema(implementation = AuthDTO.SingUpResponseDTO.class))),
            @ApiResponse(
                    responseCode = "409",
                    description = "아이디가 중복됩니다., " +
                            "닉네임이 중복됩니다., " +
                            "이메일이 중복됩니다.",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping("/api/auth/signup")
    public ResponseEntity<AuthDTO.SingUpResponseDTO> signUp(@RequestBody AuthDTO.SingUpRequestDTO dto) {
        AuthDTO.SingUpResponseDTO responseDTO = authService.signUp(dto);

        return ResponseEntity
                .status(responseDTO != null ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST)
                .body(responseDTO);
    }

    @Operation(
            summary = "accessToken 재발급 API",
            description = "refreshToken을 사용하여 accessToken을 재발급하는 API 입니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "재발급 성공!",
                    content = @Content(schema = @Schema(implementation = TokenDTO.class))),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 요청",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping("/api/auth/refresh")
    public TokenDTO refreshToken(@RequestBody TokenDTO.refreshForm dto) {
        String refresh = dto.getRefreshToken();

        return jwtTokenProvider.refreshToken(refresh);
    }
}
