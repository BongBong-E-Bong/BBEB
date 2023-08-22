package bbeb.website.controller;

import bbeb.website.dto.PostDTO;
import bbeb.website.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

    @GetMapping(value = "/api/posts")
    public Page<PostDTO.PostAllResponseDTO> findAll(
            Pageable pageable,
            @RequestParam(value = "startDate") String startDate,
            @RequestParam(value = "endDate") String endDate,
            @RequestParam(value = "order") int order,
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

    @PostMapping(value = "/api/posts/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<PostDTO.PostImageResponseDTO> createPostImage(
            @RequestPart(value="image", required=false) List<MultipartFile> files,
            Authentication authentication
    ) throws IOException {
        return postService.createPostImage(files, authentication.getName());
    }

    @PostMapping(value = "/api/posts")
    public PostDTO.CreatePostResponseDTO createPost(
            @RequestBody PostDTO.CreatePostRequestDTO dto,
            Authentication authentication
    ){
        log.info(dto.toString());
        return postService.createPost(dto, authentication.getName());
    }

    @GetMapping(value = "/api/posts/{postId}")
    public PostDTO.PostResponseDTO findPost(
            @PathVariable("postId") Long postId
    ){
        return postService.findPost(postId);
    }

    @DeleteMapping(value = "/api/posts/{postId}")
    public HttpStatus deletePost(
            @PathVariable("postId") Long postId,
            Authentication authentication
    ){
        postService.deletePost(postId, authentication.getName());
        return HttpStatus.OK;
    }

    @PostMapping(value = "/api/posts/image/{postId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<PostDTO.PostImageResponseDTO> putPostImage(
            @RequestPart(value="image", required=false) List<MultipartFile> files,
            @PathVariable(value = "postId") Long postId,
            Authentication authentication
    ) throws IOException {
        return postService.putPostImage(postId, files, authentication.getName());
    }



    @PutMapping("/api/posts/{postId}")
    public HttpStatus putPost(
            @PathVariable("postId") Long postId,
            @RequestBody PostDTO.PutPostRequestDTO dto,
            Authentication authentication
    ){
        postService.putPost(postId, dto, authentication.getName());

        return HttpStatus.OK;
    }

    @GetMapping(value = "/api/posts/likes/{postId}")
    public PostDTO.LikeResponseDTO postLike(
            @PathVariable("postId") Long postId,
            Authentication authentication
    ){
        return postService.postLike(postId, authentication.getName());
    }
}
