package bbeb.website.service;

import bbeb.website.config.exception.CustomException;
import bbeb.website.domain.comment.Comment;
import bbeb.website.domain.member.Member;
import bbeb.website.domain.post.*;
import bbeb.website.dto.PostDTO;
import bbeb.website.repository.comment.CommentRepository;
import bbeb.website.repository.member.MemberRepository;
import bbeb.website.repository.post.content.ContentRepository;
import bbeb.website.repository.post.post.PostRepository;
import bbeb.website.repository.post.postlike.PostLikeRepository;
import bbeb.website.repository.post.postview.PostViewRepository;
import bbeb.website.repository.post.tag.PostTagRepository;
import bbeb.website.repository.post.tag.TagRepository;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import static bbeb.website.config.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class PostService {
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final ContentRepository contentRepository;
    private final PostLikeRepository postLikeRepository;
    private final PostTagRepository postTagRepository;
    private final TagRepository tagRepository;
    private final CommentRepository commentRepository;
    private final PostViewRepository postViewRepository;

    private final AmazonS3 s3Client;
    @Value("${cloud.aws.s3.bucket.post}")
    private String postBucketName;

    public List<PostDTO.PostImageResponseDTO> createPostImage(List<MultipartFile> files) throws IOException {

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
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Post post = new Post();
        post.setTitle(dto.getTitle());
        post.setCreatedDate(LocalDateTime.now());
        post.setThumbnail(dto.getThumbnail());
        post.setView(0L);
        post.setMember(member);
        post.setIsPinned(dto.getIsPinned());
        post.setSortType(Sort.values()[Math.toIntExact(dto.getSortType())]);
        postRepository.save(post);

        if (dto.getPostTag() != null)
            createTag(dto.getPostTag(), post);
        createContent(dto.getContent(), post);

        return PostDTO.CreatePostResponseDTO.builder()
                .postId(post.getId())
                .build();
    }

    public PostDTO.PostResponseDTO findPost(Long postId, String loginId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(POST_NOT_FOUND));

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        if (postViewRepository.findByPostAndMember(post, member) == null){
            post.plusView();
            PostView postView = new PostView();
            postView.setPost(post);
            postView.setMember(member);
            postViewRepository.save(postView);
        }


        PostDTO.PostResponseDTO dto = postRepository.findOneRequestDTOByMemberAndPost(postId);

        dto.setIsUpdate(dto.getWriter().equals(member.getNickname()));

        return dto;
    }

    public void postLike(Long postId, String loginId){
        PostLike postLike = postLikeRepository.findByPostIdAndLoginId(postId, loginId);
        if (postLike == null){
            Post post = postRepository.findById(postId)
                    .orElseThrow(() -> new CustomException(POST_NOT_FOUND));

            Member member = memberRepository.findByLoginId(loginId)
                    .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

            postLike = new PostLike();

            postLike.setPost(post);
            postLike.setMember(member);

            postLikeRepository.save(postLike);
        }
        else{
            postLikeRepository.delete(postLike);
        }
    }

    public void deletePost(Long postId, String loginId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(POST_NOT_FOUND));

        if (Objects.equals(post.getMember().getLoginId(), loginId)){
            deleteContent(contentRepository.findByPost(post));
            deletePostLike(postLikeRepository.findByPost(post));
            deletePostTag(postTagRepository.findByPost(post));
            deletePostView(postViewRepository.findAllByPost(post));
            deleteComment(commentRepository.findAllByPost(post));

            postRepository.delete(post);
        }
        else{
            throw new CustomException(USER_NOT_FOUND);
        }

    }

    private void deletePostView(List<PostView> postViews) {
        postViewRepository.deleteAll(postViews);
    }

    public void createContent(List<PostDTO.Content> contents, Post post){
        for (PostDTO.Content contentDTO: contents) {
            Content content = contentDTO.toEntity(post);
            contentRepository.save(content);
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

    public void deleteComment(List<Comment> comments){
        commentRepository.deleteAll(comments);
    }

    public void createTag(List<PostDTO.PostTag> tags, Post post){
        for (PostDTO.PostTag tagDTO : tags) {
            Tag tag = tagRepository.findByValue(tagDTO.getValue());

            if (tag == null){
                tag = new Tag();
                tag.setValue(tagDTO.getValue());
                tagRepository.save(tag);
            }

            PostTag postTag = new PostTag();
            postTag.setPost(post);
            postTag.setTag(tag);
            postTagRepository.save(postTag);
        }
    }

    public void deletePostTag(List<PostTag> postTag){
        postTagRepository.deleteAll(postTag);
    }

    public List<PostDTO.PostImageResponseDTO> putPostImage(Long postId, List<MultipartFile> files, String loginId) throws IOException {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(POST_NOT_FOUND));


        if (post.getMember().getLoginId().equals(loginId)) {
            deleteContent(contentRepository.findByPost(post));

            return createPostImage(files);
        }
        else{
            throw new CustomException(USER_NOT_FOUND);
        }
    }

    public void putPost(Long postId, PostDTO.PutPostRequestDTO dto, String loginId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(POST_NOT_FOUND));

        if (post.getMember().getLoginId().equals(loginId)){
            if (dto.getThumbnail() != null)
                post.setThumbnail(dto.getThumbnail());

            if (dto.getIsPinned() != null)
                post.setIsPinned(dto.getIsPinned());

            if (dto.getTitle() != null)
                post.setTitle(dto.getTitle());

            if (dto.getContent() != null) {
                deleteContent(contentRepository.findByPost(post));
                createContent(dto.getContent(), post);
            }

            if (dto.getTags() != null) {
                deletePostTag(postTagRepository.findByPost(post));
                createTag(dto.getTags(), post);
            }

            if(dto.getSortType() != null){
                post.setSortType(Sort.values()[Math.toIntExact(dto.getSortType())]);
            }
        }
        else{
            throw new CustomException(USER_NOT_FOUND);
        }
    }

    public Page<PostDTO.PostAllResponseDTO> findAll(PostDTO.PostAllRequestDTO dto) {
        if (dto.getTitle() != null)
            return postRepository.searchAllByTitle(dto);
        else if(dto.getNickname() != null)
            return postRepository.searchAllByNickname(dto);
        else if(dto.getContent() != null)
            return postRepository.searchAllByContent(dto);
        else if(dto.getTag() != null)
            return postRepository.searchAllByTag(dto);
        else
            return postRepository.searchAll(dto);
    }
}
