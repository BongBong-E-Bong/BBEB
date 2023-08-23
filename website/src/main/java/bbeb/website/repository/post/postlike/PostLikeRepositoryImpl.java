package bbeb.website.repository.post.postlike;

import bbeb.website.domain.post.Post;
import bbeb.website.domain.post.PostLike;
import bbeb.website.repository.post.postlike.PostLikeRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static bbeb.website.domain.post.QPostLike.postLike;

@RequiredArgsConstructor
public class PostLikeRepositoryImpl implements PostLikeRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public PostLike findByPostIdAndLoginId(Long postId, String loginId) {
        return queryFactory
                .select(postLike)
                .from(postLike)
                .where(
                        postLike.post.id.eq(postId),
                        postLike.member.loginId.eq(loginId))
                .fetchFirst();
    }



    @Override
    public int totalLike(Long postId) {
        return queryFactory
                .select(postLike)
                .from(postLike)
                .where(
                        postLike.post.id.eq(postId))
                .fetch()
                .size();
    }

    @Override
    public List<PostLike> findByPost(Post post) {
        return queryFactory
                .select(postLike)
                .from(postLike)
                .where(postLike.post.eq(post))
                .fetch();
    }
}
