package bbeb.website.config.exception;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

@Getter
@Builder
public class ErrorResponse {
    @Schema(description = "반환일", example = "2023-08-27T15:48:29.9097732")
    private final LocalDateTime timestamp = LocalDateTime.now();
    @Schema(description = "상테 코드", example = "400")
    private final int status;
    @Schema(description = "상태 이름", example = "BAD_REQUEST")
    private final String error;
    @Schema(description = "코드 분류", example = "DUPLICATION_VOTE")
    private final String code;
    @Schema(description = "메시지", example = "하루에 한 번만 투표할 수 있어!")
    private final String message;

    public static ResponseEntity<ErrorResponse> toResponseEntity(ErrorCode errorCode) {
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.builder()
                        .status(errorCode.getHttpStatus().value())
                        .error(errorCode.getHttpStatus().name())
                        .code(errorCode.name())
                        .message(errorCode.getMessage())
                        .build()
                );
    }
}
