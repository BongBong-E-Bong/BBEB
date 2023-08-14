package bbeb.website.controller;

import bbeb.website.dto.TetrisScoreDTO;
import bbeb.website.service.TetrisScoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TetrisScoreController {
    private final TetrisScoreService tetrisScoreService;

    @PostMapping("/api/tetris")
    public TetrisScoreDTO.TetrisScoreUpdateDTO updateScore(@RequestBody TetrisScoreDTO.TetrisScoreUpdateDTO dto,
                                      Authentication authentication){

        return tetrisScoreService.updateScore(dto, authentication.getName());
    }

    @GetMapping("/api/tetris")
    public Page<TetrisScoreDTO.TetrisScoreGetDTO> getScore(Pageable pageable){
        return tetrisScoreService.searchScore(pageable);
    }
}
