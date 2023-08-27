package bbeb.website.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Builder
@Data
@AllArgsConstructor
public class TokenDTO {
    @Schema(description = "grantType", example = "Bearer")
    private String grantType;
    @Schema(description = "accessToken", example = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJhdXRoIjoiUk9MRV9NRU1CRVIiLCJleHAiOjE2OTMyMDU2MDF9._Bepw9Ido0AfYZ5OlPf0bo9wUE70uZ9haqhbbx_YbBw")
    private String accessToken;
    @Schema(description = "refreshToken", example = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE2OTQ4NTg3Nzd9.0ZeALjQNOd5j_3a4BT5C79afh-OP9woxLjFCFugNWTE")
    private String refreshToken;

    @Getter
    public static class refreshForm {
        @Schema(description = "refreshToken", example = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE2OTQ4NTg3Nzd9.0ZeALjQNOd5j_3a4BT5C79afh-OP9woxLjFCFugNWTE")
        private String refreshToken;
    }
}
