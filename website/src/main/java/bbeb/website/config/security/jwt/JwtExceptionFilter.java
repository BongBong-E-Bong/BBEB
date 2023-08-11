package bbeb.website.config.security.jwt;

import bbeb.website.config.exception.CustomException;
import bbeb.website.config.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;

import static bbeb.website.config.exception.ErrorCode.*;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtExceptionFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        try {
            chain.doFilter(request, response);
        } catch (CustomException | ServletException e) {

            String message = e.getMessage();
            if(NON_LOGIN.getMessage().equals(message)) {
                setResponse(response, ErrorCode.NON_LOGIN);
            }
            else if(INVALID_JWT_TOKEN.getMessage().equals(message)) {
                setResponse(response, INVALID_JWT_TOKEN);
            }
            else if(UNSUPPORTED_JWT_TOKEN.getMessage().equals(message)) {
                setResponse(response, UNSUPPORTED_JWT_TOKEN);
            }
            else if(EXPIRED_JWT_TOKEN.getMessage().equals(message)) {
                setResponse(response, EXPIRED_JWT_TOKEN);
            }
        }
    }

    private void setResponse(HttpServletResponse response, ErrorCode error) throws RuntimeException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(401);
        JSONObject responseJson = new JSONObject();
        responseJson.put("timestamp", LocalDateTime.now());
        responseJson.put("status", 401);
        responseJson.put("error", "UNAUTHORIZED");
        responseJson.put("code", error);
        responseJson.put("message", error.getMessage());

        response.getWriter().print(responseJson);
    }
}
