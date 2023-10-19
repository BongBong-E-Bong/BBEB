package bbeb.website.domain.post;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "content")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Content {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "content_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private ContentType contentType;
    @Column(columnDefinition = "LONGTEXT")
    private String value;
    private Long contentOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;
}
