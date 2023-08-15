package bbeb.website.repository.content;

import bbeb.website.domain.post.Content;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, Long> {
}
