package bbeb.website.controller;

import bbeb.website.config.exception.ErrorResponse;
import bbeb.website.dto.PostDTO;
import bbeb.website.dto.ProfileDTO;
import bbeb.website.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;

    @Operation(
            summary = "조건에 따른 게시글 조회 API",
            description = "조건에 따른 게시글 조회 할 때 사용하는 API 입니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 성공!",
                    content = @Content(schema = @Schema(implementation = PostDTO.PostAllResponseDTO.class)))
    })
    @GetMapping(value = "/api/posts")
    public Page<PostDTO.PostAllResponseDTO> findAll(
            Pageable pageable,
            @RequestParam(value = "startDate", defaultValue = "2001-05-05") String startDate,
            @RequestParam(value = "endDate", defaultValue = "20023-08-23") String endDate,
            @RequestParam(value = "order", defaultValue = "0") int order,
            @RequestParam(value = "writer", required = false) String nickname,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "tag", required = false) String tag,
            @RequestParam(value = "content", required = false) String content){
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        PostDTO.PostAllRequestDTO dto = new PostDTO.PostAllRequestDTO(
                pageable,
                LocalDateTime.parse(startDate + " 00:00:00", dateTimeFormatter),
                LocalDateTime.parse(endDate + " 23:59:59", dateTimeFormatter),
                order,
                nickname,
                title,
                tag,
                content
        );
        return postService.findAll(dto);
    }

    @Operation(
            summary = "게시글 이미지 업로드 API",
            description = "게시글 이미지 업로드 할 때 사용하는 API 입니다.\n\n 응답 후 /api/posts 요청해야합니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "300",
                    description = "업로드 성공! /api/posts 요청 바람!",
                    content = @Content(schema = @Schema(implementation = PostDTO.PostImageResponseDTO.class)))
    })
    @PostMapping(value = "/api/posts/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<PostDTO.PostImageResponseDTO>> createPostImage(
            @RequestPart(value="image", required=false) List<MultipartFile> files
    ) throws IOException {
        return ResponseEntity
                .status(HttpStatus.MULTIPLE_CHOICES)
                .body(postService.createPostImage(files));
    }

    @Operation(
            summary = "게시글 작성 API",
            description = "게시글 작성 할 때 사용하는 API 입니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "작성 성공!",
                    content = @Content(schema = @Schema(implementation = PostDTO.CreatePostResponseDTO.class))),
            @ApiResponse(
                    responseCode = "404",
                    description = "일치하는 유저 정보 없음",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping(value = "/api/posts")
    public ResponseEntity<PostDTO.CreatePostResponseDTO> createPost(
            @RequestBody PostDTO.CreatePostRequestDTO dto,
            Authentication authentication
    ){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(postService.createPost(dto, authentication.getName()));
    }

    @Operation(
            summary = "게시글 조회 API",
            description = "게시글 조회 할 때 사용하는 API 입니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 성공!",
                    content = @Content(schema = @Schema(implementation = PostDTO.PostResponseDTO.class))),
            @ApiResponse(
                    responseCode = "404",
                    description = "일치하는 유저 정보 없음, 일치하는 글 정보 없음",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping(value = "/api/posts/{postId}")
    public PostDTO.PostResponseDTO findPost(
            @PathVariable("postId") Long postId,
            Authentication authentication
    ){
        return postService.findPost(postId, authentication.getName());
    }

    @Operation(
            summary = "게시글 삭제 API",
            description = "게시글 삭제 할 때 사용하는 API 입니다.")
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
    @DeleteMapping(value = "/api/posts/{postId}")
    public HttpStatus deletePost(
            @PathVariable("postId") Long postId,
            Authentication authentication
    ){
        postService.deletePost(postId, authentication.getName());
        return HttpStatus.NO_CONTENT;
    }

    @Operation(
            summary = "게시글 수정 이미지 업로드 API",
            description = "게시글 수정 이미지 업로드 할 때 사용하는 API 입니다.\n\n 응답 후 /api/posts{postId} 요청해야합니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "300",
                    description = "수정 성공! /api/posts{postId} 요청 바람!",
                    content = @Content(schema = @Schema(implementation = PostDTO.PostImageResponseDTO.class))),
            @ApiResponse(
                    responseCode = "404",
                    description = "일치하는 유저 정보 없음, 일치하는 글 정보 없음",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping(value = "/api/posts/image/{postId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<PostDTO.PostImageResponseDTO>> putPostImage(
            @RequestPart(value="image", required=false) List<MultipartFile> files,
            @PathVariable(value = "postId") Long postId,
            Authentication authentication
    ) throws IOException {
        return ResponseEntity
                .status(HttpStatus.MULTIPLE_CHOICES)
                .body(postService.putPostImage(postId, files, authentication.getName()));
    }


    @Operation(
            summary = "게시글 업데이트 API",
            description = "게시글 업데이트 할 때 사용하는 API 입니다.")
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
    @PutMapping("/api/posts/{postId}")
    public HttpStatus putPost(
            @PathVariable("postId") Long postId,
            @RequestBody PostDTO.PutPostRequestDTO dto,
            Authentication authentication
    ){
        postService.putPost(postId, dto, authentication.getName());

        return HttpStatus.CREATED;
    }

    @Operation(
            summary = "게시글 좋아요 업데이트 API",
            description = "게시글 좋아요 업데이트 할 때 사용하는 API 입니다.")
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
    @GetMapping(value = "/api/posts/likes/{postId}")
    public HttpStatus postLike(
            @PathVariable("postId") Long postId,
            Authentication authentication
    ){
        postService.postLike(postId, authentication.getName());

        return HttpStatus.CREATED;
    }

    @Operation(
            summary = "내가 작성한 게시글 조회 API",
            description = "내가 작성한 게시글들을 조회 할 때 사용하는 API 입니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 성공!",
                    content = @Content(schema = @Schema(implementation = PostDTO.PostResponseDTO.class))),
            @ApiResponse(
                    responseCode = "404",
                    description = "일치하는 유저 정보 없음, 일치하는 글 정보 없음",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping(value = "/api/posts/my")
    public Page<PostDTO.PostAllResponseDTO> findMyPost(
            Pageable pageable,
            Authentication authentication
    ){
        return postService.findMyPost(pageable, authentication.getName());
    }
}
