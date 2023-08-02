package bbeb.website.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/aws/test")
    public String awsTest(){
        return "access";
    }
}
