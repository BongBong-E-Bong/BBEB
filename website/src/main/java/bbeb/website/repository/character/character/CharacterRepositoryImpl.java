package bbeb.website.repository.character.character;

import bbeb.website.dto.QVoteDTO_VoteResponseDTO;
import bbeb.website.dto.VoteDTO;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static bbeb.website.domain.character.QMainCharacter.mainCharacter;


@RequiredArgsConstructor
public class CharacterRepositoryImpl implements CharacterRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<VoteDTO.VoteResponseDTO> search() {
        return queryFactory
                .select(new QVoteDTO_VoteResponseDTO(
                        mainCharacter.brotherOrder,
                        mainCharacter.likeCount
                ))
                .from(mainCharacter)
                .orderBy(mainCharacter.likeCount.desc(), mainCharacter.brotherOrder.asc())
                .fetch();
    }
}
