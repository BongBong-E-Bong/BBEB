package bbeb.website.controller;

import bbeb.website.config.exception.ErrorResponse;
import bbeb.website.domain.comment.Comment;
import bbeb.website.dto.CommentDTO;
import bbeb.website.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(
            summary = "댓글 작성 API",
            description = "댓글 작성 할 때 사용하는 API 입니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "작성 성공!",
                    content = @Content(schema = @Schema(implementation = HttpStatus.class))),
            @ApiResponse(
                    responseCode = "404",
                    description = "일치하는 유저 정보 없음, 일치하는 글 정보 없음",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping("/api/comment")
    public HttpStatus createComment(@RequestBody CommentDTO.CreateCommentRequestDTO dto,
                                    Authentication authentication) {
        commentService.create(dto, authentication.getName());

        return HttpStatus.CREATED;
    }

    @Operation(
            summary = "댓글 삭제 API",
            description = "댓글 삭제 할 때 사용하는 API 입니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "204",
                    description = "삭제 성공!",
                    content = @Content(schema = @Schema(implementation = HttpStatus.class))),
            @ApiResponse(
                    responseCode = "404",
                    description = "일치하는 유저 정보 없음, 일치하는 글 정보 없음",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @DeleteMapping("/api/comment/{commentId}")
    public HttpStatus deleteComment(@PathVariable Long commentId,
            Authentication authentication){

        commentService.delete(commentId, authentication.getName());
        return HttpStatus.NO_CONTENT;
    }

    @Operation(
            summary = "댓글 수정 API",
            description = "댓글 수정 할 때 사용하는 API 입니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "수정 성공!",
                    content = @Content(schema = @Schema(implementation = HttpStatus.class))),
            @ApiResponse(
                    responseCode = "404",
                    description = "일치하는 유저 정보 없음, 일치하는 글 정보 없음",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PutMapping("/api/comment/{commentId}")
    public HttpStatus fetchComment(@PathVariable Long commentId,
                                   @RequestBody CommentDTO.PutCommentRequestDTO dto,
                                   Authentication authentication){
        commentService.fetch(dto, commentId, authentication.getName());

        return HttpStatus.CREATED;
    }

    @Operation(
            summary = "댓글 조회 API",
            description = "댓글 조회 할 때 사용하는 API 입니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 성공!",
                    content = @Content(schema = @Schema(implementation = CommentDTO.CommentResponseDTO.class)))
    })
    @GetMapping("/api/comment/{postId}")
    public Page<CommentDTO.CommentResponseDTO> findComment(@PathVariable Long postId,
                                                           Pageable pageable,
                                                           Authentication authentication) {
        return commentService.find(postId, pageable, authentication.getName());
    }
}
