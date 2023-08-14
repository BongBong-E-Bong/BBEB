package bbeb.website.repository.member;

import bbeb.website.repository.member.MemberRepositoryCustom;
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

    @Override
    public boolean findDuplicationByLoginId(String loginId) {
        return queryFactory
                .select(member)
                .from(member)
                .where(member.loginId.eq(loginId))
                .fetchOne() != null;
    }

    @Override
    public boolean findDuplicationByNickname(String nickname) {
        return queryFactory
                .select(member)
                .from(member)
                .where(member.nickname.eq(nickname))
                .fetchOne() != null;
    }

    @Override
    public boolean findDuplicationByEmail(String email) {
        return queryFactory
                .select(member)
                .from(member)
                .where(member.email.eq(email))
                .fetchOne() != null;
    }
}
