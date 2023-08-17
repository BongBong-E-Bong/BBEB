package bbeb.website.controller;

import bbeb.website.dto.PostDTO;
import bbeb.website.service.PostService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;

    @PostMapping(value = "/api/posts/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<PostDTO.CreatePostImageResponseDTO> createPostImage(
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
        return postService.createPost(dto, authentication.getName());
    }

    @GetMapping(value = "/api/posts/{postId}")
    public PostDTO.FindPostResponseDTO findPost(
            @PathVariable Long postId,
            Authentication authentication
    ){
        return postService.findPost(postId, authentication.getName());
    }
}
