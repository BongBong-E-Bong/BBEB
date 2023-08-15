package bbeb.website.repository;

import java.util.Optional;

public interface MemberRepositoryCustom {
    Optional<String> findRefreshTokenByLoginId(String loginId);

    boolean findDuplicationByLoginId(String loginId);
    boolean findDuplicationByNickname(String nickname);
    boolean findDuplicationByEmail(String email);
}
