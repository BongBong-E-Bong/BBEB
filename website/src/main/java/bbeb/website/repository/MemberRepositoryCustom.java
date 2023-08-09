package bbeb.website.repository;

import java.util.Optional;

public interface MemberRepositoryCustom {
    Optional<String> findRefreshTokenByLoginId(String loginId);
}
