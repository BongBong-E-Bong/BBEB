package bbeb.website.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;



public class TetrisScoreDTO {

    @Data
    @Setter
    @Getter
    public static class TetrisScoreUpdateDTO {
        private Long score;
    }

    @Data
    @Setter
    @Getter
    public static class TetrisScoreGetDTO {
        private String url;
        private String nickname;
        private Long score;

        @QueryProjection
        public TetrisScoreGetDTO(String url, String nickname, Long score) {
            this.url = url;
            this.nickname = nickname;
            this.score = score;
        }
    }

}
