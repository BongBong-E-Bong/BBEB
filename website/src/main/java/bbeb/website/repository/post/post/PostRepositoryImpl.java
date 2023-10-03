package bbeb.website.repository.post.post;

import bbeb.website.domain.post.ContentType;
import bbeb.website.dto.PostDTO;
import bbeb.website.dto.QPostDTO_Content;
import bbeb.website.dto.QPostDTO_PostTag;
import bbeb.website.repository.post.postlike.PostLikeRepository;
import com.amazonaws.services.s3.AmazonS3;
import com.querydsl.core.QueryResults;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static bbeb.website.domain.comment.QComment.comment;
import static bbeb.website.domain.member.QMember.member;
import static bbeb.website.domain.member.QProfile.profile;
import static bbeb.website.domain.post.QContent.content;
import static bbeb.website.domain.post.QPost.post;
import static bbeb.website.domain.post.QPostLike.postLike;
import static bbeb.website.domain.post.QPostTag.postTag;
import static bbeb.website.domain.post.QTag.tag;

@RequiredArgsConstructor
@Slf4j
public class PostRepositoryImpl implements PostRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final AmazonS3 s3Client;
    @Value("${cloud.aws.s3.bucket.post}")
    private String postBucketName;
    @Value("${cloud.aws.s3.bucket.profile}")
    private String profileBucketName;

    @Override
    public PostDTO.PostResponseDTO findOneRequestDTOByMemberAndPost(Long postId) {
        Tuple tuple = queryFactory
                .select(
                        post.title,
                        post.createdDate,
                        member.nickname,
                        post.view,
                        post.isPinned,
                        post.sortType)
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

        List<PostDTO.PostTag> tagsDto = queryFactory
                .select(new QPostDTO_PostTag(
                        tag.value
                ))
                .from(postTag)
                .leftJoin(postTag.tag, tag)
                .where(postTag.post.id.eq(postId))
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
                tuple.get(post.isPinned),
                contentDto,
                tagsDto,
                null,
                tuple.get(post.sortType).toString()
        );
    }

    @Override
    public Page<PostDTO.PostAllResponseDTO> searchAll(PostDTO.PostAllRequestDTO dto) {
        QueryResults<Tuple> results = queryFactory
                    .select(post.id,
                            post.thumbnail,
                            post.title,
                            member.nickname,
                            profile.url,
                            post.createdDate,
                            post.view,
                            post.isPinned,
                            postLike.count(),
                            comment.count())
                    .from(post)
                    .where(post.createdDate.between(dto.getStartDate(), dto.getEndDate()))
                    .leftJoin(post.member, member)
                    .leftJoin(post.postLikes, postLike)
                    .leftJoin(member.profile, profile)
                    .leftJoin(post.comments, comment)
                    .groupBy(post.id)
                    .orderBy(post.isPinned.desc(),
                            dto.getOrder() == 0 ? post.createdDate.desc() : postLike.count().desc())
                    .offset(dto.getPageable().getOffset())
                    .limit(dto.getPageable().getPageSize())
                    .fetchResults();


        return getPostAllResponseDTOS(dto, results);
    }

    @Override
    public Page<PostDTO.PostAllResponseDTO> searchAllByTitle(PostDTO.PostAllRequestDTO dto) {
        QueryResults<Tuple> results = queryFactory
                .select(post.id,
                        post.thumbnail,
                        post.title,
                        member.nickname,
                        profile.url,
                        post.createdDate,
                        post.view,
                        post.isPinned,
                        postLike.count(),
                        comment.count())
                .from(post)
                .where(post.title.contains(dto.getTitle()).and(post.createdDate.between(dto.getStartDate(), dto.getEndDate())))
                .leftJoin(post.member, member)
                .leftJoin(member.profile, profile)
                .leftJoin(post.postLikes, postLike)
                .leftJoin(post.comments, comment)
                .groupBy(post.id)
                .distinct()
                .orderBy(post.isPinned.desc(),
                        dto.getOrder() == 0 ? post.createdDate.desc() : postLike.count().desc())
                .offset(dto.getPageable().getOffset())
                .limit(dto.getPageable().getPageSize())
                .fetchResults();

        return getPostAllResponseDTOS(dto, results);
    }

    @Override
    public Page<PostDTO.PostAllResponseDTO> searchAllByNickname(PostDTO.PostAllRequestDTO dto) {
        QueryResults<Tuple> results = queryFactory
                .select(post.id,
                        post.thumbnail,
                        post.title,
                        member.nickname,
                        profile.url,
                        post.createdDate,
                        post.view,
                        post.isPinned,
                        postLike.count(),
                        comment.count())
                .from(member)
                .where(member.nickname.eq(dto.getNickname()).and(post.createdDate.between(dto.getStartDate(), dto.getEndDate())))
                .leftJoin(member.posts, post)
                .leftJoin(member.profile, profile)
                .leftJoin(post.postLikes, postLike)
                .leftJoin(post.comments, comment)
                .groupBy(post.id)
                .distinct()
                .orderBy(post.isPinned.desc(),
                        dto.getOrder() == 0 ? post.createdDate.desc() : postLike.count().desc())
                .offset(dto.getPageable().getOffset())
                .limit(dto.getPageable().getPageSize())
                .fetchResults();

        return getPostAllResponseDTOS(dto, results);
    }

    @Override
    public Page<PostDTO.PostAllResponseDTO> searchAllByContent(PostDTO.PostAllRequestDTO dto) {
        QueryResults<Tuple> results = queryFactory
                .select(post.id,
                        post.thumbnail,
                        post.title,
                        member.nickname,
                        profile.url,
                        post.createdDate,
                        post.view,
                        post.isPinned,
                        postLike.count(),
                        comment.count())
                .from(content)
                .where(content.value.contains(dto.getContent()).and(content.contentType.eq(ContentType.TEXT)).and(post.createdDate.between(dto.getStartDate(), dto.getEndDate())))
                .leftJoin(content.post, post)
                .leftJoin(post.member, member)
                .leftJoin(member.profile, profile)
                .leftJoin(post.postLikes, postLike)
                .leftJoin(post.comments, comment)
                .groupBy(post.id)
                .distinct()
                .orderBy(post.isPinned.desc(),
                        dto.getOrder() == 0 ? post.createdDate.desc() : postLike.count().desc())
                .offset(dto.getPageable().getOffset())
                .limit(dto.getPageable().getPageSize())
                .fetchResults();

        return getPostAllResponseDTOS(dto, results);
    }

    @Override
    public Page<PostDTO.PostAllResponseDTO> searchAllByTag(PostDTO.PostAllRequestDTO dto) {
        QueryResults<Tuple> results = queryFactory
                .select(post.id,
                        post.thumbnail,
                        post.title,
                        member.nickname,
                        profile.url,
                        post.createdDate,
                        post.view,
                        post.isPinned,
                        postLike.count(),
                        comment.count())
                .from(tag)
                .where(tag.value.eq(dto.getTag()).and(post.createdDate.between(dto.getStartDate(), dto.getEndDate())))
                .leftJoin(tag.postTagList, postTag)
                .leftJoin(postTag.post, post)
                .leftJoin(post.member, member)
                .leftJoin(member.profile, profile)
                .leftJoin(post.postLikes, postLike)
                .leftJoin(post.comments, comment)
                .groupBy(post.id)
                .distinct()
                .orderBy(post.isPinned.desc(),
                        dto.getOrder() == 0 ? post.createdDate.desc() : postLike.count().desc())
                .offset(dto.getPageable().getOffset())
                .limit(dto.getPageable().getPageSize())
                .fetchResults();

        return getPostAllResponseDTOS(dto, results);
    }


    private Page<PostDTO.PostAllResponseDTO> getPostAllResponseDTOS(PostDTO.PostAllRequestDTO dto, QueryResults<Tuple> results) {
        List<PostDTO.PostAllResponseDTO> content = new ArrayList<>();

        for (Tuple tuple : results.getResults()) {
            List<PostDTO.PostTag> tags = queryFactory
                    .select(new QPostDTO_PostTag(
                            tag.value
                    ))
                    .from(postTag)
                    .leftJoin(postTag.tag, tag)
                    .where(postTag.post.id.eq(tuple.get(post.id)))
                    .fetch();

            content.add(new PostDTO.PostAllResponseDTO(
                    tuple.get(post.id),
                    s3Client.getUrl(postBucketName, tuple.get(post.thumbnail)).toString(),
                    tuple.get(post.title),
                    tuple.get(member.nickname),
                    s3Client.getUrl(profileBucketName, tuple.get(profile.url) == null ? "default.jpg" : tuple.get(profile.url)).toString(),
                    tuple.get(post.createdDate),
                    tuple.get(post.view),
                    tuple.get(postLike.count()),
                    tags,
                    tuple.get(post.isPinned),
                    tuple.get(comment.count())
            ));
        }

        return new PageImpl<>(content, dto.getPageable(), results.getTotal());
    }
}
