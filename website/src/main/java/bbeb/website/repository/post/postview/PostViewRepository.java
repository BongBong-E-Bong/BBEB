package bbeb.website.repository.post.postview;

import bbeb.website.domain.member.Member;
import bbeb.website.domain.post.Post;
import bbeb.website.domain.post.PostView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostViewRepository extends JpaRepository<PostView, Long> {
    PostView findByPostAndMember(Post post, Member member);
    List<PostView> findAllByPost(Post post);
}
