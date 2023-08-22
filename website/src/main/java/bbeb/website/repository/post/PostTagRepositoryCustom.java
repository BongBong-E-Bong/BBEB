package bbeb.website.repository.post;

import bbeb.website.domain.post.Post;
import bbeb.website.domain.post.PostTag;

import java.util.List;

public interface PostTagRepositoryCustom {
    List<PostTag> findByPost(Post post);
}
