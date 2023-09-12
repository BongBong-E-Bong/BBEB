package bbeb.website.repository.comment;

import bbeb.website.domain.comment.Comment;
import bbeb.website.dto.CommentDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommentRepositoryCustom {
    Page<CommentDTO.CommentResponseDTO> search(Long postId, Pageable pageable);
}
