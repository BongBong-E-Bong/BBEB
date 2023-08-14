package bbeb.website.controller;


import bbeb.website.domain.Member;
import bbeb.website.dto.ProfileDTO;
import bbeb.website.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;


    @PostMapping("/api/members/profile")
    public ProfileDTO.ProfileResponseDTO uploadProfile(@ModelAttribute ProfileDTO.ProfileRequestDTO dto,
                                Authentication authentication) throws IOException {

        return memberService.uploadProfile(dto, authentication.getName());
    }

    @GetMapping("/api/members/profile")
    public ProfileDTO.ProfileResponseDTO getProfile(Authentication authentication){
        return memberService.getProfile(authentication.getName());
    }
}
