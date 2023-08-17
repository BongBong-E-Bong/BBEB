package bbeb.website.service;

import bbeb.website.config.exception.CustomException;
import bbeb.website.domain.member.Member;
import bbeb.website.domain.post.Content;
import bbeb.website.domain.post.Post;
import bbeb.website.dto.PostDTO;
import bbeb.website.repository.content.ContentRepository;
import bbeb.website.repository.member.MemberRepository;
import bbeb.website.repository.post.PostRepository;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static bbeb.website.config.exception.ErrorCode.BadRequest;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostService {
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final ContentRepository contentRepository;

    private final AmazonS3 s3Client;
    @Value("${cloud.aws.s3.bucket.post}")
    private String postBucketName;

    public List<PostDTO.CreatePostImageResponseDTO> createPostImage(List<MultipartFile> files, String loginId) throws IOException {

        List<PostDTO.CreatePostImageResponseDTO> dtoList = new ArrayList<>();

        for (MultipartFile file : files) {
            PostDTO.CreatePostImageResponseDTO dto = new PostDTO.CreatePostImageResponseDTO();

            dto.setFileName(file.getOriginalFilename());
            UUID uuid = UUID.randomUUID();

            String imageFileName = uuid + "_" + file.getOriginalFilename();

            File destinationFile = new File(imageFileName);

            if(destinationFile.createNewFile()) {
                try(FileOutputStream fos = new FileOutputStream(imageFileName)) {
                    fos.write(file.getBytes());
                }
            }

            dto.setUrl(imageFileName);

            s3Client.putObject(new PutObjectRequest(postBucketName, dto.getUrl(), destinationFile));

            dtoList.add(dto);

            destinationFile.delete();
        }

        return dtoList;
    }

    public PostDTO.CreatePostResponseDTO createPost(PostDTO.CreatePostRequestDTO dto, String loginId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(BadRequest));

        Post post = new Post();
        post.setTitle(dto.getTitle());
        post.setCreatedDate(LocalDateTime.now());
        post.setView(0L);
        post.setMember(member);

        postRepository.save(post);


        for (PostDTO.Content contentDTO: dto.getContent()) {
            Content content = contentDTO.toEntity(post);

            contentRepository.save(content);
        }


        return PostDTO.CreatePostResponseDTO.builder()
                .postId(post.getId())
                .build();
    }

    public PostDTO.FindPostResponseDTO findPost(Long postId, String loginId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(BadRequest));
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(BadRequest));

        List<Content> contents = contentRepository.findByPost(post);


        PostDTO.FindPostResponseDTO dto = new PostDTO.FindPostResponseDTO();
        dto.setTitle(post.getTitle());
        dto.setDate(post.getCreatedDate());
        dto.setView(post.getView());
        dto.setWriter(member.getNickname());
        dto.setContents(new ArrayList<>());

        for (Content content : contents) {
            PostDTO.Content contentDTO = new PostDTO.Content();

            contentDTO.setContentOrder(content.getContentOrder());
            contentDTO.setContentType(content.getContentType().toString());
            contentDTO.setValue(content.getValue());

            dto.getContents().add(contentDTO);
        }
        return dto;
    }
}
