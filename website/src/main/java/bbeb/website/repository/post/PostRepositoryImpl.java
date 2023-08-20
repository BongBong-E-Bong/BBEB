package bbeb.website.repository.post;

import bbeb.website.dto.PostDTO;
import bbeb.website.dto.QPostDTO_Content;
import com.amazonaws.services.s3.AmazonS3;
import com.querydsl.core.QueryFactory;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.expression.spel.ast.Projection;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static bbeb.website.domain.member.QMember.member;
import static bbeb.website.domain.post.QContent.content;
import static bbeb.website.domain.post.QPost.post;

@RequiredArgsConstructor
@Slf4j
public class PostRepositoryImpl implements PostRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final AmazonS3 s3Client;
    @Value("${cloud.aws.s3.bucket.post}")
    private String postBucketName;

    @Override
    public PostDTO.PostResponseDTO findOneRequestDTOByMemberAndPost(Long postId) {
        Tuple tuple = queryFactory
                .select(
                        post.title,
                        post.createdDate,
                        member.nickname,
                        post.view)
                .from(post)
                .leftJoin(post.member, member)
                .leftJoin(post.contents, content)
                .where(post.id.eq(postId))
                .fetchFirst();

        List<PostDTO.Content> contentDto = queryFactory
                .select(new QPostDTO_Content(
                        content.contentType.stringValue(),
                        content.value,
                        content.contentOrder
                ))
                .from(content)
                .where(content.post.id.eq(postId))
                .fetch();

        contentDto.forEach(object -> {
                    if(Objects.equals(object.getContentType(), "IMAGE")){
                        object.setValue(s3Client.getUrl(postBucketName, object.getValue()).toString());
                    }
                });

        return new PostDTO.PostResponseDTO(
                tuple.get(post.title),
                tuple.get(post.createdDate),
                tuple.get(member.nickname),
                tuple.get(post.view),
                contentDto
        );
    }
}
