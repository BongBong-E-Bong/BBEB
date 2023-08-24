package bbeb.website.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

public class VoteDTO {

    @Data
    @Getter
    public static class VoteRequestDTO {
        private Long order;
    }

    @Data
    @Setter
    public static class VoteResponseDTO {
        private Long order;
        private Long likeCount;

        @QueryProjection
        public VoteResponseDTO(Long order, Long likeCount) {
            this.order = order;
            this.likeCount = likeCount;
        }
    }
}
