package bbeb.website.repository.tetrisscore;

import bbeb.website.domain.game.TetrisScore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TetrisScoreRepository extends JpaRepository<TetrisScore, Long>, TetrisScoreRepositoryCustom {

}
