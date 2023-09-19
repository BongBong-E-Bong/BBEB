package bbeb.website.dto;

import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class CommentDTO {

    @Data
    @Getter
    public static class CreateCommentRequestDTO {
        @Schema(description = "댓글 내용", example = "코딩 좋아!")
        private String value;
        @Schema(description = "댓글 타입(TEXT, EMOTICON, EMOTICON_TEXT)", example = "EMOTICON_TEXT")
        private String type;
        @Schema(description = "글 번호", example = "1")
        private Long postId;
        @Schema(description = "이모티콘 이름", example = "호두.jpg")
        private String url;
    }

    @Data
    @Getter
    public static class PutCommentRequestDTO {
        @Schema(description = "댓글 내용", example = "코딩 좋아!")
        private String value;
        @Schema(description = "댓글 타입(TEXT, EMOTICON, EMOTICON_TEXT)", example = "EMOTICON_TEXT")
        private String type;
        @Schema(description = "이모티콘 이름", example = "호두.jpg")
        private String url;
    }

    @Data
    @Setter
    public static class CommentResponseDTO {
        @Schema(description = "댓글 내용", example = "코딩 좋아!")
        private String value;
        @Schema(description = "댓글 작성자", example = "hg_yellow")
        private String writer;
        @Schema(description = "댓글 작성자 프로필", example = "https://bbeb-image.s3.ap-northeast-2.amazonaws.com/emoticon/%ED%98%B8%EB%91%90.jpg")
        private String profileUrl;
        @Schema(description = "댓글 작성 시간", example = "2023-08-27T15:34:57.276Z")
        private LocalDateTime createDate;
        @Schema(description = "댓글 번호", example = "1")
        private Long commentId;
        @Schema(description = "댓글 타입(TEXT, EMOTICON, EMOTICON_TEXT)", example = "EMOTICON_TEXT")
        private String type;
        @Schema(description = "이모티콘 url", example = "https://bbeb-image.s3.ap-northeast-2.amazonaws.com/emoticon/%ED%98%B8%EB%91%90.jpg")
        private String emoticonUrl;
        @Schema(description = "수정/삭제 여부", example = "true, false")
        private Boolean isUpdate;

        @QueryProjection
        public CommentResponseDTO(String value, String writer, String profileUrl, LocalDateTime createDate, String type, String emoticonUrl, Long commentId, Boolean isUpdate) {
            this.value = value;
            this.writer = writer;
            this.profileUrl = profileUrl;
            this.createDate = createDate;
            this.type = type;
            this.emoticonUrl = emoticonUrl;
            this.commentId = commentId;
            this.isUpdate = isUpdate;
        }
    }
}
