package bbeb.website.repository.character.characterlike;

import bbeb.website.domain.character.CharacterLike;
import bbeb.website.domain.comment.Comment;
import bbeb.website.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CharacterLikeRepository extends JpaRepository<CharacterLike, Long> {
    List<CharacterLike> findAllByMember(Member member);
}
