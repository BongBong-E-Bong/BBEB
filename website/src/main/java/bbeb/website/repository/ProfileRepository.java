package bbeb.website.repository;

import bbeb.website.domain.Member;
import bbeb.website.domain.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Profile findByMember(Member member);
}
