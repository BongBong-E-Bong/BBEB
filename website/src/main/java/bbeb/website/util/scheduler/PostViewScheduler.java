package bbeb.website.util.scheduler;

import bbeb.website.repository.character.characterlike.CharacterLikeRepository;
import bbeb.website.repository.post.postview.PostViewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@SpringBootApplication
@EnableScheduling
@RequiredArgsConstructor
public class PostViewScheduler {
    private final PostViewRepository postViewRepository;


    @Scheduled(cron = "0 0 0 * * *")
    public void resetPostView(){
        postViewRepository.deleteAll();
    }
}
