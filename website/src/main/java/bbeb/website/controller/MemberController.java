package bbeb.website.controller;


import bbeb.website.entity.Member;
import bbeb.website.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/api/members")
    public List<Member> findAll(){
        return memberService.findAll();
    }
}
