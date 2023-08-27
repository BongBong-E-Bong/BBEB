package bbeb.website.domain.post;

import bbeb.website.domain.member.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "postView")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostView {
    @Id
    @GeneratedValue
    @Column(name = "post_view_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}
