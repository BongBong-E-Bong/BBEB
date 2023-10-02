package bbeb.website.repository.character.character;

import bbeb.website.dto.VoteDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CharacterRepositoryCustom {
    List<VoteDTO.VoteResponseDTO> search();
}
