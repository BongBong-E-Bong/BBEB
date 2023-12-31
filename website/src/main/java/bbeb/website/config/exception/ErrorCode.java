package bbeb.website.config.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;


@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    /*
    Unknown(0),

    Continue(100),
    SwitchingProtocols(101),
    Processing(102),
    EarlyHints(103),
    Created(201),
    Accepted(202),
    NonAuthoritative(203),
    NoContent(204),
    ResetContent(205),
    PartialContent(206),
    MultiStatus(207),
    AlreadyReported(208),
    IMUsed(209),
    MultipleChoices(300),
    MovePermanently(301),
    Found(302),
    SeeOther(303),
    NotModified(304),
    UseProxy(305),
    SwitchProxy(306),
    TemporaryRedirect(307),
    PermanentRedirect(308),
    PaymentRequired(402),
    MethodNotAllowed(405),
    NotAcceptable(406),
    ProxyAuthenticationRequired(407),
    RequestTimeout(408),
    Conflict(409),
    Gone(410),
    LengthRequired(411),
    PreconditionFailed(412),
    PayloadTooLarge(413),
    URITooLong(414),
    UnsupportedMediaType(415),
    RangeNotSatisfiable(416),
    ExpectationFailed(417),
    IMATeapot(418),
    MisdirectedRequest(421),
    UnProcessableEntity(422),
    Locked(423),
    FailedDependency(424),
    TooEarly(425),
    UpgradeRequired(426),
    PreconditionRequired(428),
    TooManyRequests(429),
    RequestHeaderFieldsTooLarge(431),
    UnavailableForLegalReasons(451),
    NotImplemented(501),
    BadGateway(502),
    ServiceUnavailable(503),
    GatewayTimeout(504),
    HTTPVersionNotSupported(505),
    NotExtended(510),
    NetworkAuthenticationRequired(511);
     */

    /* 400 BAD_REQUEST */
    BadRequest(BAD_REQUEST, "잘못된 요청"),

    DUPLICATION_VOTE(BAD_REQUEST, "하루에 한 번만 투표할 수 있어!"),
    NOT_EQ_COUNT_VOTE(BAD_REQUEST, "세명 이하만 투표할 수 있어!"),

    /* 401 UNAUTHORIZED */
    INVALID_JWT_TOKEN(UNAUTHORIZED, "손상된 토큰"),
    EXPIRED_JWT_TOKEN(UNAUTHORIZED,"만료된 토큰"),
    UNSUPPORTED_JWT_TOKEN(UNAUTHORIZED, "지원하지 않는 토큰"),
    NON_LOGIN(UNAUTHORIZED, "JWT claims가 비어있음"),

    /* 403 FORBIDDEN */
    Forbidden(FORBIDDEN, "권한 없음"),

    /* 404 NOT_FOUND */
    USER_NOT_FOUND(NOT_FOUND, "일치하는 유저 정보 없음"),
    POST_NOT_FOUND(NOT_FOUND, "일치하는 글 정보 없음"),


    /* 409 CONFLICT */
    LOGIN_ID_DUPLICATED(CONFLICT, "아이디가 중복됩니다."),
    NICKNAME_DUPLICATED(CONFLICT, "닉네임이 중복됩니다."),
    EMAIL_DUPLICATED(CONFLICT, "이메일이 중복됩니다."),

    /* 500 */
    SERVER_ERROR(INTERNAL_SERVER_ERROR, "서버 에러"),
    ;

    private final HttpStatus httpStatus;
    private final String message;

}
