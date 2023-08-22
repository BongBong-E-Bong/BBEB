package bbeb.website.repository.post;

import bbeb.website.domain.post.PostTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostTagRepository extends JpaRepository<PostTag, Long>, PostTagRepositoryCustom {

}
