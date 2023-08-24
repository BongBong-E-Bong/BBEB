package bbeb.website.util.scheduler;

import bbeb.website.repository.character.characterlike.CharacterLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@SpringBootApplication
@EnableScheduling
@RequiredArgsConstructor
public class VoteScheduler {
    private final CharacterLikeRepository characterLikeRepository;


    @Scheduled(cron = "0 0 0 * * *")
    public void resetVote(){
        characterLikeRepository.deleteAll();
    }
}
