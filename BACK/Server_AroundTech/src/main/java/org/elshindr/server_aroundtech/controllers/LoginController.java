package org.elshindr.server_aroundtech.controllers;

import jakarta.servlet.ServletContext;
import org.elshindr.server_aroundtech.configs.JWTConfig;
import org.elshindr.server_aroundtech.dtos.LoginDto;
import org.elshindr.server_aroundtech.dtos.UserDto;

import org.elshindr.server_aroundtech.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;
import org.elshindr.server_aroundtech.repositories.UserRepository;
import org.elshindr.server_aroundtech.services.UserService;

import java.util.Map;
import java.util.Optional;

/**
 * LoginController
 * Controller d'authentification
 */
@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PasswordEncoder pwdEncoder;
    private JWTConfig jwtConfig;
    private UserService userSvc;




    /**
     * Instantiates a new Login controller.
     *
     * @param jwtConfig  the jwt config
     * @param userRepo   the user repo
     * @param pwdEncoder the pwd encoder
     * @param userSvc    the user svc
     */
    public LoginController(JWTConfig jwtConfig, UserRepository userRepo, PasswordEncoder pwdEncoder, UserService userSvc){
        this.userRepo = userRepo;
        this.pwdEncoder = pwdEncoder;
        this.userSvc = userSvc;
        this.jwtConfig = jwtConfig;
    }

    /**
     * Gets user info.
     *
     * @param authentication the authentication
     * @return the user info
     */
    @GetMapping("/user-info")
    public ResponseEntity<?> getUserInfo(Authentication authentication) {

        // Récupérer les informations de l'utilisateur à partir de l'objet Authentication
        if (authentication != null && authentication.getPrincipal() != null) {
            System.out.println(authentication.toString());
            System.out.println(authentication.getPrincipal().toString());
           UserDto userDto = this.userSvc.getUserInfo(authentication);
            return ResponseEntity.ok().body(userDto);
        }

        return ResponseEntity.status(HttpStatus.I_AM_A_TEAPOT).build();
    }

    /**
     * Gets session.
     *
     * @param csrfToken csrfToken
     * @return the session
     */
    @GetMapping("/session")
    public CsrfToken getSession(CsrfToken csrfToken) {
        //String xsrfToken = request.getHeader("X-XSRF-TOKEN");

       // HttpHeaders headers = new HttpHeaders();
        //headers.add("X-XSRF-TOKEN", xsrfToken);

        //System.out.println(xsrfToken);
        //return ResponseEntity.ok().headers(headers).body(new Response("Connexion trouvée"));
        return csrfToken;
    }

    /**
     * Get login response entity.
     *
     * @param loginDto the login dto
     * @return the response entity
     */
    @PostMapping
    public ResponseEntity<?> setLogin(@RequestBody LoginDto loginDto){

        System.out.println(loginDto.toString());
        UserDto userDto = this.userSvc.getUserByLogin(loginDto);

        if (userDto != null) {

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.SET_COOKIE, userSvc.buildJWTCookie(userDto, jwtConfig));

            return ResponseEntity.ok().headers(headers).body(userDto);

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Login non trouvé");
        }

       // return ResponseEntity.ok().body("ok");
    }

}
