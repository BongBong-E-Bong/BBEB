package bbeb.website.domain.post;

import lombok.*;

import javax.persistence.*;

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
}
