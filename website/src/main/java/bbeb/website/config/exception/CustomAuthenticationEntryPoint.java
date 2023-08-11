package bbeb.website.config.exception;

import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        Object exception = request.getAttribute("exception");

        if(exception instanceof ErrorCode){
            ErrorCode errorCode = (ErrorCode) exception;
            try {
                setResponse(response, errorCode);
            } catch (JSONException e) {
                throw new RuntimeException(e);
            }

            return;
        }

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }


    private void setResponse(HttpServletResponse response, ErrorCode exceptionCode) throws IOException, JSONException {
        log.error("token error : {}, {}", exceptionCode.getHttpStatus(), exceptionCode.getMessage());

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        JSONObject responseJson = new JSONObject();
        responseJson.put("message", exceptionCode.getMessage());
        responseJson.put("code", exceptionCode.getHttpStatus());

        response.getWriter().print(responseJson);
    }
}
