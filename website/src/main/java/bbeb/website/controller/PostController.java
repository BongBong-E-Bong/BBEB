package bbeb.website.controller;

import bbeb.website.dto.PostDTO;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@NoArgsConstructor
@Slf4j
public class PostController {
    @PostMapping(value = "/api/post",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public void createPost(
            @RequestPart(value="image", required=false) List<MultipartFile> files,
            @RequestPart(value = "json") PostDTO.CreatePostRequestDTO dto
    ){
        for (MultipartFile file : files) {
            log.info(file.getName());
        }

        log.info(dto.getTitle());

        for (PostDTO.CreatePostRequestDTO.Content content : dto.getContent()){
            log.info(content.toString());
        }

    }
}
