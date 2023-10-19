package bbeb.website.domain.character;

import bbeb.website.domain.member.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "character_like")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CharacterLike {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "character_like_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "main_character_id")
    private MainCharacter character;
}
