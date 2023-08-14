package bbeb.website.repository.tetrisscore;

import bbeb.website.dto.QTetrisScoreDTO_TetrisScoreGetDTO;
import bbeb.website.dto.TetrisScoreDTO;
import com.amazonaws.services.s3.AmazonS3;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static bbeb.website.domain.QMember.member;
import static bbeb.website.domain.QProfile.profile;
import static bbeb.website.domain.QTetrisScore.tetrisScore;

@RequiredArgsConstructor
public class TetrisScoreRepositoryImpl implements TetrisScoreRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    private final AmazonS3 s3Client;

    @Value("${cloud.aws.s3.bucket.profile}")
    private String profileBucketName;

    @Override
    public Page<TetrisScoreDTO.TetrisScoreGetDTO> searchScore(Pageable pageable) {
        QueryResults<TetrisScoreDTO.TetrisScoreGetDTO> results = queryFactory
                .select(new QTetrisScoreDTO_TetrisScoreGetDTO(
                        profile.url,
                        member.nickname,
                        tetrisScore.score
                ))
                .from(member)
                .rightJoin(member.tetrisScore, tetrisScore)
                .leftJoin(member.profile, profile)
                .orderBy(member.tetrisScore.score.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<TetrisScoreDTO.TetrisScoreGetDTO> content = results.getResults();

        content.forEach(object -> object.setUrl(
                        s3Client.getUrl(profileBucketName, object.getUrl() == null ? "default.jpg" : object.getUrl()).toString()));

        long total = results.getTotal();


        return new PageImpl<>(content, pageable, total);
    }
}
