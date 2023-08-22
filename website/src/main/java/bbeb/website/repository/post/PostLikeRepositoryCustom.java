package bbeb.website.repository.post;

import bbeb.website.domain.post.Post;
import bbeb.website.domain.post.PostLike;

import java.util.List;

public interface PostLikeRepositoryCustom {
    PostLike findByPostIdAndLoginId(Long postId, String loginId);
    int totalLike(Long postId);

    List<PostLike> findByPost(Post post);
}
