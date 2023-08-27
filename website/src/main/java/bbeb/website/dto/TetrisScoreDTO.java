package bbeb.website.dto;

import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;



public class TetrisScoreDTO {

    @Data
    @Setter
    @Getter
    public static class TetrisScoreUpdateDTO {
        @Schema(description = "테트리스 기록", example = "10000")
        private Long score;
    }

    @Data
    @Setter
    @Getter
    public static class TetrisScoreGetDTO {
        @Schema(description = "Member 프로필 사진", example = "https://bbeb-image.s3.ap-northeast-2.amazonaws.com/emoticon/%ED%98%B8%EB%91%90.jpg")
        private String url;
        @Schema(description = "Member Nickname", example = "hg_yellow")
        private String nickname;
        @Schema(description = "테트리스 기록", example = "10000")
        private Long score;

        @QueryProjection
        public TetrisScoreGetDTO(String url, String nickname, Long score) {
            this.url = url;
            this.nickname = nickname;
            this.score = score;
        }
    }

}
