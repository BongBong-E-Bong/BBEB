package bbeb.website.repository.post.tag;

import bbeb.website.domain.post.Post;
import bbeb.website.domain.post.PostTag;
import bbeb.website.repository.post.tag.PostTagRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static bbeb.website.domain.post.QPostTag.postTag;

@RequiredArgsConstructor
public class PostTagRepositoryImpl implements PostTagRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<PostTag> findByPost(Post post) {
        return queryFactory
                .select(postTag)
                .from(postTag)
                .where(postTag.post.eq(post))
                .fetch();
    }
}
