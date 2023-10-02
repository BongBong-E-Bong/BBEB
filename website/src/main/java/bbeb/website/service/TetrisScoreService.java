package bbeb.website.service;

import bbeb.website.config.exception.CustomException;
import bbeb.website.domain.member.Member;
import bbeb.website.domain.game.TetrisScore;
import bbeb.website.dto.TetrisScoreDTO;
import bbeb.website.repository.member.MemberRepository;
import bbeb.website.repository.tetrisscore.TetrisScoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import static bbeb.website.config.exception.ErrorCode.BadRequest;
import static bbeb.website.config.exception.ErrorCode.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class TetrisScoreService {
    private final MemberRepository memberRepository;
    private final TetrisScoreRepository tetrisScoreRepository;


    public void updateScore(TetrisScoreDTO.TetrisScoreUpdateDTO dto, String loginId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        TetrisScore tetrisScore = member.getTetrisScore();

        if (tetrisScore == null) {
            tetrisScore = TetrisScore.builder()
                    .member(member)
                    .score(dto.getScore())
                    .build();

            member.setTetrisScore(tetrisScore);
        }
        else {
            tetrisScore.updateScore(dto.getScore());
        }

        tetrisScoreRepository.save(tetrisScore);
    }

    public Page<TetrisScoreDTO.TetrisScoreGetDTO> searchScore(Pageable pageable) {
        return tetrisScoreRepository.searchScore(pageable);
    }
}
