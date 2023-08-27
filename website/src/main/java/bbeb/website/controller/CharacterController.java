package bbeb.website.controller;

import bbeb.website.config.exception.ErrorResponse;
import bbeb.website.dto.AuthDTO;
import bbeb.website.dto.VoteDTO;
import bbeb.website.service.CharacterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(
            summary = "인기 투표 API",
            description = "인기 투표 할 때 사용하는 API 입니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "투표 성공!",
                    content = @Content(schema = @Schema(implementation = HttpStatus.class))),
            @ApiResponse(
                    responseCode = "404",
                    description = "일치하는 유저 정보 없음",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 요청, 하루에 한 번만 투표할 수 있어!, 세명 이하만 투표할 수 있어!",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping("/api/vote")
    private HttpStatus vote(@RequestBody List<VoteDTO.VoteRequestDTO> dto,
                            Authentication authentication) {
        characterService.vote(dto, authentication.getName());
        return HttpStatus.CREATED;
    }

    @Operation(
            summary = "인기 투표 결과 조회 API",
            description = "인기 투표 결과를 조회 할 때 사용하는 API 입니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 성공!",
                    content = @Content(schema = @Schema(implementation = VoteDTO.VoteResponseDTO.class)))
    })
    @GetMapping("/api/vote")
    private List<VoteDTO.VoteResponseDTO> find() {
        return characterService.find();
    }
}
