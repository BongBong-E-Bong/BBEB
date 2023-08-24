package bbeb.website.controller;

import bbeb.website.dto.VoteDTO;
import bbeb.website.service.CharacterService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CharacterController {
    private final CharacterService characterService;

    @PostMapping("/api/vote")
    private HttpStatus vote(@RequestBody List<VoteDTO.VoteRequestDTO> dto,
                            Authentication authentication) {
        characterService.vote(dto, authentication.getName());
        return HttpStatus.CREATED;
    }

    @GetMapping("/api/vote")
    private List<VoteDTO.VoteResponseDTO> find() {
        return characterService.find();
    }
}
