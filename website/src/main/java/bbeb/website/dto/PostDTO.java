package bbeb.website.dto;

import bbeb.website.domain.post.ContentType;
import lombok.Data;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class PostDTO {

    @Data
    @Getter
    public static class CreatePostRequestDTO{
        private String title;
        private List<Content> content;

        @Getter
        @Data
        public static class Content {
            private int contentType;
            private String value;
            private Long contentOrder;
        }
    }
}
