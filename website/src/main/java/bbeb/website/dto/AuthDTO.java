package bbeb.website.dto;

import bbeb.website.domain.Member;
import bbeb.website.domain.Role;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

public class AuthDTO {

    @Data
    @Getter
    public static class SingUpRequestDTO {
        private String loginId;
        private String password;
        private String nickname;
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
        private Long memberId;
        private String loginId;
        private String nickname;
        private String email;
    }

    @Data
    @Getter
    public static class SignInRequestDTO {
        private String loginId;
        private String password;
    }
}
