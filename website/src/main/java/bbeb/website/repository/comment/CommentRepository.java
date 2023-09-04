package bbeb.website.repository.comment;

import bbeb.website.domain.comment.Comment;
import bbeb.website.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long>, CommentRepositoryCustom {
    List<Comment> findAllByPost(Post post);
}
