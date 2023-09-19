package bbeb.website.repository.comment;

import bbeb.website.config.exception.CustomException;
import bbeb.website.config.exception.ErrorCode;
import bbeb.website.domain.member.Member;
import bbeb.website.dto.CommentDTO;
import bbeb.website.dto.QCommentDTO_CommentResponseDTO;
import bbeb.website.repository.member.MemberRepository;
import com.amazonaws.services.s3.AmazonS3;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Objects;

import static bbeb.website.domain.comment.QComment.comment;
import static bbeb.website.domain.member.QMember.member;
import static bbeb.website.domain.member.QProfile.profile;
import static bbeb.website.domain.post.QPost.post;

@RequiredArgsConstructor
@Slf4j
public class CommentRepositoryImpl implements CommentRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final MemberRepository memberRepository;
    private final AmazonS3 s3Client;
    @Value("${cloud.aws.s3.bucket.profile}")
    private String profileBucketName;
    @Value("${cloud.aws.s3.bucket.emoticon}")
    private String emoticonBucketName;

    @Override
    public Page<CommentDTO.CommentResponseDTO> search(Long postId, Pageable pageable, String loginId) {
        Member checkMember = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        List<CommentDTO.CommentResponseDTO> result = queryFactory
                    .select(new QCommentDTO_CommentResponseDTO(
                            comment.value,
                            member.nickname,
                            profile.url,
                            comment.createDate,
                            comment.commentType.stringValue(),
                            comment.url,
                            comment.id,
                            Expressions.asBoolean(false)
                    ))
                    .from(comment)
                    .where(post.id.eq(postId))
                    .leftJoin(comment.post, post)
                    .leftJoin(comment.member, member)
                    .leftJoin(member.profile, profile)
                    .offset(pageable.getOffset())
                    .limit(pageable.getPageSize())
                    .orderBy(comment.createDate.desc())
                    .fetch();

        result.forEach(object -> object.setProfileUrl(s3Client.getUrl(profileBucketName, object.getProfileUrl() == null ? "default.jpg" : object.getProfileUrl()).toString()));
        result.forEach(object ->{
            if (Objects.equals(object.getType(), "EMOTICON") || Objects.equals(object.getType(), "EMOTICON_TEXT"))
                object.setEmoticonUrl(s3Client.getUrl(emoticonBucketName, object.getValue()).toString());
        });

        result.forEach(object -> object.setIsUpdate(object.getWriter().equals(checkMember.getNickname())));

        return new PageImpl<>(result, pageable, result.size());
    }
}
