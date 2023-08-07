package bbeb.website.repository;

import bbeb.website.domain.QMember;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import static bbeb.website.domain.QMember.member;

@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Optional<String> findRefreshTokenByLoginId(String loginId) {
        return Optional.ofNullable(
                queryFactory
                        .select(member.refreshToken)
                        .from(member)
                        .where(member.loginId.eq(loginId)).fetchOne());
    }
}
