package bbeb.website.domain.post;

import bbeb.website.domain.member.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "post_like")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostLike {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "post_like_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;
}
