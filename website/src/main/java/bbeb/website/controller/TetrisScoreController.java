package bbeb.website.controller;

import bbeb.website.config.exception.ErrorResponse;
import bbeb.website.dto.TetrisScoreDTO;
import bbeb.website.service.TetrisScoreService;
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
public class TetrisScoreController {
    private final TetrisScoreService tetrisScoreService;

    @Operation(
            summary = "테트리스 기록 업데이트 API",
            description = "테트리스 기록 업데이트 할 때 사용하는 API 입니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "업데이트 성공!",
                    content = @Content(schema = @Schema(implementation = HttpStatus.class))),
            @ApiResponse(
                    responseCode = "404",
                    description = "일치하는 유저 정보 없음",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping("/api/tetris")
    public HttpStatus updateScore(@RequestBody TetrisScoreDTO.TetrisScoreUpdateDTO dto,
                                  Authentication authentication){

        tetrisScoreService.updateScore(dto, authentication.getName());

        return HttpStatus.CREATED;
    }

    @Operation(
            summary = "테트리스 기록 조회 API",
            description = "테트리스 기록 조회 할 때 사용하는 API 입니다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 성공!",
                    content = @Content(schema = @Schema(implementation = TetrisScoreDTO.TetrisScoreGetDTO.class)))
    })
    @GetMapping("/api/tetris")
    public Page<TetrisScoreDTO.TetrisScoreGetDTO> getScore(Pageable pageable){
        return tetrisScoreService.searchScore(pageable);
    }
}
