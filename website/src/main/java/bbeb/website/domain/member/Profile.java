package bbeb.website.domain.member;

import bbeb.website.domain.member.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "profile")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Profile {

    @Id @GeneratedValue
    @Column(name = "profile_id")
    private Long id;

    private String url;

    @OneToOne(mappedBy = "profile")
    @JsonIgnore
    private Member member;

    public void updateUrl(String url) {
        this.url = url;
    }
}
