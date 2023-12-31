package bbeb.website.domain.post;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "tag")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Tag {
    @Id
    @GeneratedValue
    @Column(name = "tag_id")
    private Long id;

    @OneToMany(mappedBy = "tag")
    private List<PostTag> postTagList;

    private String value;
}
