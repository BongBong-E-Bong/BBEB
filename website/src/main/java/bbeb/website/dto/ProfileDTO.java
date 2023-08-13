package bbeb.website.dto;

import lombok.Data;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

public class ProfileDTO {

    @Data
    public static class ProfileRequestDTO{
        private MultipartFile file;
    }

    @Data
    @Setter
    public static class ProfileResponseDTO{
        private String url;
    }
}
