package bbeb.website.controller;


import bbeb.website.config.exception.ErrorResponse;
import bbeb.website.dto.ProfileDTO;
import bbeb.website.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @Operation(
            summary = "멤버 프로필사진 업데이트 API",
            description = "멤버 프로필사진 업데이트 할 때 사용하는 API 입니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "업데이트 성공!",
                    content = @Content(schema = @Schema(implementation = ProfileDTO.ProfileResponseDTO.class))),
            @ApiResponse(
                    responseCode = "404",
                    description = "일치하는 유저 정보 없음",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping(value = "/api/members/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ProfileDTO.ProfileResponseDTO uploadProfile(@ModelAttribute ProfileDTO.ProfileRequestDTO dto,
                                Authentication authentication) throws IOException {

        return memberService.uploadProfile(dto, authentication.getName());
    }

    @Operation(
            summary = "멤버 프로필사진 조회 API",
            description = "멤버 프로필사진 조회 할 때 사용하는 API 입니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 성공!",
                    content = @Content(schema = @Schema(implementation = ProfileDTO.ProfileResponseDTO.class))),
            @ApiResponse(
                    responseCode = "404",
                    description = "일치하는 유저 정보 없음",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/api/members/profile")
    public ProfileDTO.ProfileResponseDTO getProfile(Authentication authentication){
        return memberService.getProfile(authentication.getName());
    }
}
