package bbeb.website.repository.profile;

import bbeb.website.domain.Member;
import bbeb.website.domain.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

}
