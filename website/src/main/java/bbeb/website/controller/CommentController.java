package bbeb.website.controller;

import bbeb.website.domain.comment.Comment;
import bbeb.website.dto.CommentDTO;
import bbeb.website.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/api/comment")
    public HttpStatus createComment(@RequestBody CommentDTO.CreateCommentRequestDTO dto,
                                    Authentication authentication) {
        commentService.create(dto, authentication.getName());

        return HttpStatus.CREATED;
    }

    @DeleteMapping("/api/comment/{commentId}")
    public HttpStatus deleteComment(@PathVariable Long commentId,
            Authentication authentication){

        commentService.delete(commentId, authentication.getName());
        return HttpStatus.OK;
    }

    @PutMapping("/api/comment/{commentId}")
    public HttpStatus fetchComment(@PathVariable Long commentId,
                                   @RequestBody CommentDTO.PutCommentRequestDTO dto,
                                   Authentication authentication){
        commentService.fetch(dto, commentId, authentication.getName());

        return HttpStatus.OK;
    }

    @GetMapping("/api/comment/{postId}")
    public Page<CommentDTO.CommentResponseDTO> findComment(@PathVariable Long postId,
                                                           Pageable pageable){
        return commentService.find(postId, pageable);
    }
}
