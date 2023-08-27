package bbeb.website.dto;

import bbeb.website.domain.member.Member;
import bbeb.website.domain.member.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

public class AuthDTO {

    @Data
    @Getter
    public static class SingUpRequestDTO {
        @Schema(description = "회원 ID", example = "jang010505")
        private String loginId;
        @Schema(description = "회원 Password", example = "12345678")
        private String password;
        @Schema(description = "회원 Nickname", example = "hg_yellow")
        private String nickname;
        @Schema(description = "회원 Email", example = "jang010505@gmail.com")
        private String email;

        public Member toEntity() {
            return Member
                    .builder()
                    .role(Role.ROLE_MEMBER)
                    .loginId(loginId)
                    .password(password)
                    .nickname(nickname)
                    .email(email)
                    .build();
        }
    }

    @Data
    @Getter
    @Setter
    public static class SingUpResponseDTO {
        @Schema(description = "회원 DB ID", example = "1")
        private Long memberId;
        @Schema(description = "회원 ID", example = "jang010505")
        private String loginId;
        @Schema(description = "회원 Nickname", example = "hg_yellow")
        private String nickname;
        @Schema(description = "회원 Email", example = "jang010505@gmail.com")
        private String email;
    }

    @Data
    @Getter
    public static class SignInRequestDTO {
        @Schema(description = "회원 ID", example = "jang010505")
        private String loginId;

        @Schema(description = "회원 Password", example = "12345678")
        private String password;
    }
}
