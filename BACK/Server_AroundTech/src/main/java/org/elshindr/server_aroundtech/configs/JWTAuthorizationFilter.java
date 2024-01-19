package org.elshindr.server_aroundtech.configs;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * JWTAuthorizationFilter
 * Filtre des autorisations du jeton JWT selon le role/user
 */
@Configuration
public class JWTAuthorizationFilter extends OncePerRequestFilter {

    private JWTConfig jwtConfig;

    public JWTAuthorizationFilter(JWTConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        var cookies = request.getCookies();

        // Recherche du jeton par Cookie
        if (cookies != null) {

            Stream.of(cookies)
                    .filter(cookie -> cookie.getName().equals(jwtConfig.getCookie()))
                    .map(Cookie::getValue)
                    .forEach(token -> {
                        Claims body = Jwts.parserBuilder()
                                .setSigningKey(jwtConfig.getSecretKey())
                                .build()
                                .parseClaimsJws(token)
                                .getBody();

                        String userName = body.getSubject();
                        System.out.println("test BUG");
                        System.out.println("test BUG 2 :"+ body.get("roles"));
                        List<String> roles = new ArrayList<String>();
                        roles.add(body.get("roles").toString());

                        List<SimpleGrantedAuthority> authorities = roles
                                .stream()
                                .map(SimpleGrantedAuthority::new)
                                .collect(Collectors.toList());

                        Authentication authentication = new UsernamePasswordAuthenticationToken(userName, null, authorities);

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    });
        }

        chain.doFilter(request, response);
    }
}