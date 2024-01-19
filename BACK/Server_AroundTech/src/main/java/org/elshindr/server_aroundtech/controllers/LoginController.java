package org.elshindr.server_aroundtech.controllers;

import org.elshindr.server_aroundtech.configs.JWTConfig;
import org.elshindr.server_aroundtech.dtos.LoginDto;
import org.elshindr.server_aroundtech.dtos.UserDto;
import org.elshindr.server_aroundtech.models.Response;
import jakarta.servlet.http.HttpServletRequest;

import org.elshindr.server_aroundtech.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.elshindr.server_aroundtech.repositories.UserRepository;
import org.elshindr.server_aroundtech.services.UserService;

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

    public LoginController(JWTConfig jwtConfig, UserRepository userRepo, PasswordEncoder pwdEncoder, UserService userSvc){
        this.userRepo = userRepo;
        this.pwdEncoder = pwdEncoder;
        this.userSvc = userSvc;
        this.jwtConfig = jwtConfig;
    }

    @GetMapping("/user-info")
    public ResponseEntity<?> getUserInfo(Authentication authentication) {


        try{

            // Récupérer les informations de l'utilisateur à partir de l'objet Authentication
            if (authentication != null && authentication.getPrincipal() != null){
                System.out.println(authentication.toString());
                System.out.println(authentication.getPrincipal().toString());
                // UserDto userDto = (UserDto) ;
                //return ResponseEntity.ok(userDto);


                Optional<User> userOptional = this.userRepo.findDistinctByEmail((String) authentication.getPrincipal())
                        .stream().findFirst();

                if (userOptional.isPresent()) {
                    UserDto userDto = UserDto.parseUserToUserDto(userOptional.get(), this.userRepo);
                    return ResponseEntity.ok().body(userDto);
                } else {
                    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
                }
            }

            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }catch(Exception ex){
            System.out.println(ex.getMessage());

            return ResponseEntity.status(HttpStatus.I_AM_A_TEAPOT).build();
        }


    }

    @PostMapping("/csrf")
    public ResponseEntity<?> getSession(HttpServletRequest request) {

        System.out.println("====================== GET CSRF ==========================");

        String xsrfToken = request.getHeader("X-XSRF-TOKEN");

        HttpHeaders headers = new HttpHeaders();
        headers.add("X-XSRF-TOKEN", xsrfToken);

        System.out.println(xsrfToken);
        return ResponseEntity.ok().headers(headers).body(new Response("Connexion trouvée"));
    }

    @PostMapping
    public ResponseEntity<?> getLogin(@RequestBody LoginDto loginDto){

        System.out.println("===================== LoginController POST  /login");
        System.out.println(loginDto.toString());

        Optional<User> userOptional = this.userRepo.findDistinctByEmail(loginDto.getEmail())
                .filter(user -> pwdEncoder.matches(loginDto.getPwd(), user.getPwd()));

        if (userOptional.isPresent()) {
            UserDto userDto = UserDto.parseUserToUserDto(userOptional.get(), this.userRepo);
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.SET_COOKIE, userSvc.buildJWTCookie(userDto, jwtConfig));

            return ResponseEntity.ok().headers(headers).body(userDto);

        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }



    ///
    /// SE DECO
    ///

    @PostMapping("/logout")
    public ResponseEntity<?>  logout(){
        System.out.println("===================== DECONNEXION ");

        return ResponseEntity.ok().body(new Response("Déconnecté"));
    }

}
