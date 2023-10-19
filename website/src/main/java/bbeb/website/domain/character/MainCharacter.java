package bbeb.website.domain.character;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "mainCharacter")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MainCharacter {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "main_character_id")
    private Long id;
    private Long brotherOrder;
    private Long likeCount;

    @OneToMany(mappedBy = "character")
    private List<CharacterLike> characterLikes;

    public void addLike() {
        likeCount++;
    }
}
