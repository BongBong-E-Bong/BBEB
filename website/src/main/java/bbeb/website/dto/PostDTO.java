package bbeb.website.dto;

import bbeb.website.domain.post.ContentType;
import bbeb.website.domain.post.Post;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
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
        @Schema(description = "글 제목", example = "하하!")
        private String title;
        @Schema(description = "썸네일", example = "호두.jpg")
        private String thumbnail;
        @Schema(description = "고정 여부(고정O: 1, 고정X: 0)", example = "1")
        private Long isPinned;
        @Schema(description = "정렬 타입(기본: 0, 왼쪽: 1, 중앙: 2, 오른쪽: 3", example = "1")
        private Long sortType;
        private List<Content> contents;
        private List<PostTag> postTag;
    }


    @Data
    @Getter
    @Setter
    @NoArgsConstructor
    public static class PostTag {
        @Schema(description = "태그", example = "고양이")
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
        @Schema(description = "content TYPE(TEXT, IMAGE)", example = "TEXT")
        private String contentType;
        @Schema(description = "응답 받은 이미지 url 이나 내용", example = "하하!")
        private String value;
        @Schema(description = "순서 0부터 시작~", example = "0")
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
        @Schema(description = "이미지 url", example = "호두.jpg")
        private String url;
        @Schema(description = "파일 이름", example = "호두.jpg")
        private String fileName;
    }

    @Data
    @Getter
    @Setter
    @Builder
    public static class CreatePostResponseDTO {
        @Schema(description = "글 아이디", example = "1")
        private Long postId;
    }

    @Getter
    @Setter
    @Data
    public static class PostResponseDTO {
        @Schema(description = "글 제목", example = "하하!")
        private String title;
        @Schema(description = "글 작성일", example = "2023-08-27T16:52:53.291Z")
        private LocalDateTime date;
        @Schema(description = "글 작성자", example = "hg_yellow")
        private String writer;
        @Schema(description = "글 조회수", example = "100")
        private Long view;
        @Schema(description = "고정 여부(고정O: 1, 고정X: 0)", example = "1")
        private Long isPinned;
        @Schema(description = "정렬 타입", example = "BASIC")
        private String sortType;
        private List<Content> contents;
        private List<PostTag> tags;
        @Schema(description = "수정/삭제 여부", example = "true, false")
        private Boolean isUpdate;

        @QueryProjection
        public PostResponseDTO(String title, LocalDateTime date, String writer, Long view, Long isPinned, List<Content> contents, List<PostTag> tags, Boolean isUpdate, String sortType) {
            this.title = title;
            this.date = date;
            this.writer = writer;
            this.view = view;
            this.isPinned = isPinned;
            this.contents = contents;
            this.tags = tags;
            this.isUpdate = isUpdate;
            this.sortType = sortType;
        }
    }

    @Data
    @Getter
    @Setter
    @AllArgsConstructor
    public static class LikeResponseDTO {
        @Schema(description = "좋아요 수", example = "100")
        int total;
    }

    @Data
    @Setter
    public static class PutPostRequestDTO {
        @Schema(description = "글 제목", example = "하하!")
        private String title;
        @Schema(description = "썸네일", example = "호두.jpg")
        private String thumbnail;
        @Schema(description = "고정 여부(고정O: 1, 고정X: 0)", example = "1")
        private Long isPinned;
        @Schema(description = "정렬 타입(기본: 0, 왼쪽: 1, 중앙: 2, 오른쪽: 3", example = "1")
        private Long sortType;
        private List<Content> contents;
        private List<PostTag> tags;
    }

    @Data
    @Getter
    @Setter
    public static class PostAllResponseDTO {
        @Schema(description = "글 ID", example = "100")
        private Long postId;
        @Schema(description = "썸네일", example = "호두.jpg")
        private String thumbnail;
        @Schema(description = "글 제목", example = "하하!")
        private String title;
        @Schema(description = "작성자", example = "hg_yellow")
        private String writer;
        @Schema(description = "작성자 프로필", example = "호두.jpg")
        private String memberProfile;
        @Schema(description = "글 작성일", example = "2023-08-27T16:52:53.291Z")
        private LocalDateTime date;
        @Schema(description = "조회수", example = "100")
        private Long view;
        @Schema(description = "좋아요 수", example = "100")
        private Long like;
        @Schema(description = "댓글 수", example = "100")
        private Long commentCount;
        @Schema(description = "고정 여부(고정O: 1, 고정X: 0)", example = "1")
        private Long isPinned;
        private List<PostTag> postTag;

        @QueryProjection
        public PostAllResponseDTO(Long postId, String thumbnail, String title, String writer, String memberProfile, LocalDateTime date, Long view, Long like, List<PostTag> postTag, Long isPinned, Long commentCount) {
            this.postId = postId;
            this.thumbnail = thumbnail;
            this.title = title;
            this.writer = writer;
            this.memberProfile = memberProfile;
            this.date = date;
            this.view = view;
            this.like = like;
            this.commentCount = commentCount;
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
