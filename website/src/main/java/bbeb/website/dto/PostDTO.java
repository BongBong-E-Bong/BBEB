package bbeb.website.dto;

import bbeb.website.domain.post.Content;
import bbeb.website.domain.post.ContentType;
import bbeb.website.domain.post.Post;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public class PostDTO {

    @Data
    @Getter
    public static class CreatePostRequestDTO{
        private String title;
        private List<Content> content;
    }

    @Getter
    @Data
    @Setter
    @NoArgsConstructor
    public static class Content {
        private String contentType;
        private String value;
        private Long contentOrder;


        @QueryProjection
        public Content(String contentType, String value, Long contentOrder) {
            this.contentType = contentType;
            this.value = value;
            this.contentOrder = contentOrder;
        }

        public bbeb.website.domain.post.Content toEntity(Post post) {
            return bbeb.website.domain.post.Content.builder()
                    .contentOrder(contentOrder)
                    .value(value)
                    .contentType(Objects.equals(contentType, "TEXT") ? ContentType.TEXT : ContentType.IMAGE)
                    .post(post)
                    .build();
        }
    }

    @Data
    @Getter
    public static class PostImageResponseDTO{
        private String url;
        private String fileName;
    }

    @Data
    @Getter
    @Setter
    @Builder
    public static class CreatePostResponseDTO {
        private Long postId;
    }

    @Getter
    @Setter
    @Data
    public static class PostResponseDTO {
        private String title;
        private LocalDateTime date;
        private String writer;
        private Long view;
        private List<Content> contents;

        @QueryProjection
        public PostResponseDTO(String title, LocalDateTime date, String writer, Long view, List<Content> contents) {
            this.title = title;
            this.date = date;
            this.writer = writer;
            this.view = view;
            this.contents = contents;
        }
    }

    @Data
    @Getter
    @Setter
    @AllArgsConstructor
    public static class LikeResponseDTO {
        int total;
    }

    @Data
    @Setter
    public static class PutPostRequestDTO {
        private String title;
        private List<Content> content;
    }
}
