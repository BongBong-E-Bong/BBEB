package bbeb.website.repository.tetrisscore;

import bbeb.website.dto.TetrisScoreDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TetrisScoreRepositoryCustom {
    Page<TetrisScoreDTO.TetrisScoreGetDTO> searchScore(Pageable pageable);
}
