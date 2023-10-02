package bbeb.website.repository.post.postview;

import bbeb.website.domain.member.Member;
import bbeb.website.domain.post.Post;
import bbeb.website.domain.post.PostView;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostViewRepository extends JpaRepository<PostView, Long> {
    PostView findByPostAndMember(Post post, Member member);
}
