package bbeb.website.repository.post;

import bbeb.website.domain.post.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByValue(String value);
}
