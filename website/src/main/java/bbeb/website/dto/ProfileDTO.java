package bbeb.website.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

public class ProfileDTO {

    @Data
    public static class ProfileRequestDTO{
        @Schema(description = "이미지 파일")
        private MultipartFile profile;
    }

    @Data
    @Setter
    public static class ProfileResponseDTO{
        @Schema(description = "이미지 경로", example = "https://bbeb-image.s3.ap-northeast-2.amazonaws.com/emoticon/%ED%98%B8%EB%91%90.jpg")
        private String url;
    }
}
