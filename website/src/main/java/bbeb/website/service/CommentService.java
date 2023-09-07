package bbeb.website.service;

import bbeb.website.config.exception.CustomException;
import bbeb.website.config.exception.ErrorCode;
import bbeb.website.domain.comment.Comment;
import bbeb.website.domain.comment.CommentType;
import bbeb.website.domain.member.Member;
import bbeb.website.domain.post.Post;
import bbeb.website.dto.CommentDTO;
import bbeb.website.repository.comment.CommentRepository;
import bbeb.website.repository.member.MemberRepository;
import bbeb.website.repository.post.post.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;


    public void create(CommentDTO.CreateCommentRequestDTO dto, String loginId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Post post = postRepository.findById(dto.getPostId())
                .orElseThrow(() -> new CustomException(ErrorCode.POST_NOT_FOUND));

        Comment comment = new Comment();
        comment.setCommentType(Objects.equals(dto.getType(), "TEXT") ? CommentType.TEXT : CommentType.EMOTICON);
        comment.setValue(dto.getValue());
        comment.setMember(member);
        comment.setPost(post);
        comment.setCreateDate(LocalDateTime.now());
        comment.setUrl(dto.getUrl());

        commentRepository.save(comment);
    }

    public void delete(Long commentId, String loginId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(ErrorCode.POST_NOT_FOUND));

        if (Objects.equals(comment.getMember().getLoginId(), loginId))
            commentRepository.delete(comment);
        else
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
    }

    public void fetch(CommentDTO.PutCommentRequestDTO dto, Long commentId, String loginId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(ErrorCode.POST_NOT_FOUND));

        if (Objects.equals(comment.getMember().getLoginId(), loginId)){
            comment.setCommentType(Objects.equals(dto.getType(), "TEXT") ? CommentType.TEXT : CommentType.EMOTICON);
            comment.setValue(dto.getValue());
            comment.setUrl(dto.getUrl());
        }
        else
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
    }

    public Page<CommentDTO.CommentResponseDTO> find(Long postId, Pageable pageable, String loginId) {
        return commentRepository.search(postId, pageable, loginId);
    }
}
