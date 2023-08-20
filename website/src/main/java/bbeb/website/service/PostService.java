package bbeb.website.service;

import bbeb.website.config.exception.CustomException;
import bbeb.website.domain.member.Member;
import bbeb.website.domain.post.Content;
import bbeb.website.domain.post.ContentType;
import bbeb.website.domain.post.Post;
import bbeb.website.domain.post.PostLike;
import bbeb.website.dto.PostDTO;
import bbeb.website.repository.post.ContentRepository;
import bbeb.website.repository.member.MemberRepository;
import bbeb.website.repository.post.PostLikeRepository;
import bbeb.website.repository.post.PostRepository;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
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
import java.util.Objects;
import java.util.UUID;

import static bbeb.website.config.exception.ErrorCode.BadRequest;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostService {
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final ContentRepository contentRepository;
    private final PostLikeRepository postLikeRepository;

    private final AmazonS3 s3Client;
    @Value("${cloud.aws.s3.bucket.post}")
    private String postBucketName;

    public List<PostDTO.PostImageResponseDTO> createPostImage(List<MultipartFile> files, String loginId) throws IOException {

        List<PostDTO.PostImageResponseDTO> dtoList = new ArrayList<>();

        for (MultipartFile file : files) {
            PostDTO.PostImageResponseDTO dto = new PostDTO.PostImageResponseDTO();

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

    public PostDTO.PostResponseDTO findPost(Long postId) {
        return postRepository.findOneRequestDTOByMemberAndPost(postId);
    }

    public PostDTO.LikeResponseDTO postLike(Long postId, String loginId){
        PostLike postLike = postLikeRepository.findByPostIdAndLoginId(postId, loginId);
        if (postLike == null){
            Post post = postRepository.findById(postId)
                    .orElseThrow(() -> new CustomException(BadRequest));

            Member member = memberRepository.findByLoginId(loginId)
                    .orElseThrow(() -> new CustomException(BadRequest));

            postLike = new PostLike();

            postLike.setPost(post);
            postLike.setMember(member);

            postLikeRepository.save(postLike);
        }
        else{
            postLikeRepository.delete(postLike);
        }

        return new PostDTO.LikeResponseDTO(postLikeRepository.totalLike(postId));
    }

    public void deletePost(Long postId, String loginId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(BadRequest));

        if (Objects.equals(post.getMember().getLoginId(), loginId)){
            deleteContent(contentRepository.findByPost(post));
            deletePostLike(postLikeRepository.findByPostId(postId));
            postRepository.delete(post);
        }
        else{
            throw new CustomException(BadRequest);
        }

    }

    public void deleteContent(List<Content> contents){
        for (Content content : contents) {
            if (content.getContentType().equals(ContentType.IMAGE)){
                s3Client.deleteObject(new DeleteObjectRequest(postBucketName, content.getValue()));
            }
        }

        contentRepository.deleteAll(contents);
    }

    public void deletePostLike(List<PostLike> postLikes){
        postLikeRepository.deleteAll(postLikes);
    }

    public List<PostDTO.PostImageResponseDTO> putPostImage(Long postId, List<MultipartFile> files, String loginId) throws IOException {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(BadRequest));


        if (post.getMember().getLoginId().equals(loginId)) {
            deleteContent(contentRepository.findByPost(post));

            return createPostImage(files, loginId);
        }
        else{
            throw new CustomException(BadRequest);
        }
    }

    public void putPost(Long postId, PostDTO.PutPostRequestDTO dto, String loginId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(BadRequest));

        if (post.getMember().getLoginId().equals(loginId)){
            if (dto.getTitle() != null)
                post.setTitle(dto.getTitle());

            if (dto.getContent() != null) {
                for (PostDTO.Content contentDTO: dto.getContent()) {
                    Content content = contentDTO.toEntity(post);
                    contentRepository.save(content);
                }
            }
        }
        else{
            throw new CustomException(BadRequest);
        }
    }
}
