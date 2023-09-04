package bbeb.website.repository.character.character;

import bbeb.website.domain.character.MainCharacter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CharacterRepository extends JpaRepository<MainCharacter, Long>, CharacterRepositoryCustom {
    Optional<MainCharacter> findByBrotherOrder(Long Order);
}
