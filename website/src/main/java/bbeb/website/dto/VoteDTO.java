package bbeb.website.dto;

import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

public class VoteDTO {

    @Data
    @Getter
    public static class VoteRequestDTO {
        @Schema(description = "이봉이 형제 순서입니다.(1~8)", example = "1")
        private Long order;
    }

    @Data
    @Setter
    public static class VoteResponseDTO {
        @Schema(description = "이봉이 형제 순서입니다.(1~8)", example = "1")
        private Long order;
        @Schema(description = "좋아요 수입니다.", example = "100")
        private Long likeCount;

        @QueryProjection
        public VoteResponseDTO(Long order, Long likeCount) {
            this.order = order;
            this.likeCount = likeCount;
        }
    }
}
