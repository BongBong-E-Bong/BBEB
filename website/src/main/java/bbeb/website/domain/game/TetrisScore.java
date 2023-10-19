package bbeb.website.domain.game;

import bbeb.website.domain.member.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "tetris_score")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TetrisScore {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "tetris_id")
    private Long id;

    private Long score;

    @OneToOne(mappedBy = "tetrisScore")
    @JsonIgnore
    private Member member;

    public void updateScore(Long score) {
        if (this.score < score)
            this.score = score;
    }
}
