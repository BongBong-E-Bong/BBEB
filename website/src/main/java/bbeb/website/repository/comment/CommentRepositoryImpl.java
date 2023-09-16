package bbeb.website.repository.comment;

import bbeb.website.dto.CommentDTO;
import bbeb.website.dto.QCommentDTO_CommentResponseDTO;
import com.amazonaws.services.s3.AmazonS3;
import com.querydsl.core.QueryResults;
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
    private final AmazonS3 s3Client;
    @Value("${cloud.aws.s3.bucket.profile}")
    private String profileBucketName;
    @Value("${cloud.aws.s3.bucket.emoticon}")
    private String emoticonBucketName;

    @Override
    public Page<CommentDTO.CommentResponseDTO> search(Long postId, Pageable pageable) {
        QueryResults<CommentDTO.CommentResponseDTO> results = queryFactory
                    .select(new QCommentDTO_CommentResponseDTO(
                            comment.value,
                            member.nickname,
                            profile.url,
                            comment.createDate,
                            comment.commentType.stringValue(),
                            comment.url,
                            comment.id
                    ))
                    .from(comment)
                    .where(post.id.eq(postId))
                    .leftJoin(comment.post, post)
                    .leftJoin(comment.member, member)
                    .leftJoin(member.profile, profile)
                    .offset(pageable.getOffset())
                    .limit(pageable.getPageSize())
                    .orderBy(comment.createDate.desc())
                    .fetchResults();

        List<CommentDTO.CommentResponseDTO> content = results.getResults();

        content.forEach(object -> object.setProfileUrl(s3Client.getUrl(profileBucketName, object.getProfileUrl() == null ? "default.jpg" : object.getProfileUrl()).toString()));
        content.forEach(object ->{
            if (Objects.equals(object.getType(), "EMOTICON") || Objects.equals(object.getType(), "EMOTICON_TEXT"))
                object.setEmoticonUrl(s3Client.getUrl(emoticonBucketName, object.getValue()).toString());
        });

        return new PageImpl<>(content, pageable, results.getTotal());
    }
}
