package bbeb.website.dto;

import bbeb.website.domain.post.ContentType;
import bbeb.website.domain.post.Post;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public class PostDTO {

    @Data
    @Getter
    @Setter
    public static class CreatePostRequestDTO{
        private String title;
        private String thumbnail;
        private Long isPinned;
        private List<Content> content;
        private List<PostTag> postTag;
    }


    @Data
    @Getter
    @Setter
    @NoArgsConstructor
    public static class PostTag {
        private String value;

        @QueryProjection
        public PostTag(String value){
            this.value = value;
        }
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
        private Long isPinned;
        private List<Content> contents;
        private List<PostTag> tags;

        @QueryProjection
        public PostResponseDTO(String title, LocalDateTime date, String writer, Long view, Long isPinned, List<Content> contents, List<PostTag> tags) {
            this.title = title;
            this.date = date;
            this.writer = writer;
            this.view = view;
            this.isPinned = isPinned;
            this.contents = contents;
            this.tags = tags;
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
        private String thumbnail;
        private Long isPinned;
        private List<Content> content;
        private List<PostTag> tags;
    }

    @Data
    @Getter
    @Setter
    public static class PostAllResponseDTO {
        private Long postId;
        private String thumbnail;
        private String title;
        private String writer;
        private String memberProfile;
        private LocalDateTime date;
        private Long view;
        private Long like;
        // private Long commentCount;
        private Long isPinned;
        private List<PostTag> postTag;

        @QueryProjection
        public PostAllResponseDTO(Long postId, String thumbnail, String title, String writer, String memberProfile, LocalDateTime date, Long view, Long like, List<PostTag> postTag, Long isPinned) {
            this.postId = postId;
            this.thumbnail = thumbnail;
            this.title = title;
            this.writer = writer;
            this.memberProfile = memberProfile;
            this.date = date;
            this.view = view;
            this.like = like;
            //this.commentCount = commentCount;
            this.postTag = postTag;
            this.isPinned = isPinned;
        }
    }

    @Data
    @Getter
    @Setter
    @AllArgsConstructor
    public static class PostAllRequestDTO {
        private Pageable pageable;
        private LocalDateTime startDate;
        private LocalDateTime endDate;
        private int order;
        private String nickname;
        private String title;
        private String tag;
        private String content;
    }
}
