package bbeb.website.dto;

import lombok.Data;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

public class ProfileDTO {

    @Data
    public static class ProfileRequestDTO{
        private MultipartFile profile;
    }

    @Data
    @Setter
    public static class ProfileResponseDTO{
        private String url;
    }
}
