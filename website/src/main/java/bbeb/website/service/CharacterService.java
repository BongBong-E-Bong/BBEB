package bbeb.website.service;

import bbeb.website.config.exception.CustomException;
import bbeb.website.config.exception.ErrorCode;
import bbeb.website.domain.character.CharacterLike;
import bbeb.website.domain.character.MainCharacter;
import bbeb.website.domain.member.Member;
import bbeb.website.dto.VoteDTO;
import bbeb.website.repository.character.character.CharacterRepository;
import bbeb.website.repository.character.characterlike.CharacterLikeRepository;
import bbeb.website.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CharacterService {
    private final CharacterRepository characterRepository;
    private final CharacterLikeRepository characterLikeRepository;
    private final MemberRepository memberRepository;

    public void vote(List<VoteDTO.VoteRequestDTO> dto, String loginId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(ErrorCode.BadRequest));

        if (dto.size() != 3)
            throw new CustomException(ErrorCode.NOT_EQ_COUNT_VOTE);

        if (characterLikeRepository.findAllByMember(member).size() == 0){
            for (VoteDTO.VoteRequestDTO voteRequestDTO : dto) {
                MainCharacter character = characterRepository.findByBrotherOrder(voteRequestDTO.getOrder())
                        .orElseThrow(() -> new CustomException(ErrorCode.BadRequest));

                character.addLike();
                CharacterLike characterLike = new CharacterLike();
                characterLike.setMember(member);
                characterLike.setCharacter(character);
                characterLikeRepository.save(characterLike);
            }
        }
        else
            throw new CustomException(ErrorCode.DUPLICATION_VOTE);
    }

    public List<VoteDTO.VoteResponseDTO> find() {
        return characterRepository.search();
    }
}
