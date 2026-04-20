package rs.ac.metropolitan.socialmediamanager.security;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor; 


@Component
@RequiredArgsConstructor

public class JwtAuthenticationFilter  extends OncePerRequestFilter{

        private final JwtService jwtService;
        private final UserDetailsService userDetailsService;

    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException, java.io.IOException {

        final String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        String token = header.substring(7);
        String username = jwtService.extractUsername(token);

        if (username != null &&
            SecurityContextHolder.getContext().getAuthentication() == null) {
        
            var userDetails = userDetailsService.loadUserByUsername(username);
        
            if (jwtService.isTokenValid(token, userDetails)) {
        
                var authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
        
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
                filterChain.doFilter(request,response);
    }
    @Override
protected boolean shouldNotFilter(HttpServletRequest request) {
    String path = request.getServletPath();
        return path.startsWith("/api/auth/") ||
            path.startsWith("/swagger-ui") ||
            path.startsWith("/v3/api-docs") ||
            path.startsWith("/swagger-resources") ||
            path.startsWith("/webjars") ||
            path.startsWith("/api/instagram/") ||
            path.startsWith("/api/users/") ||
            path.startsWith("/api/users/me") ||
            path.startsWith("/h2-console") ||
            path.startsWith("/api/spotify/");
    }
}
