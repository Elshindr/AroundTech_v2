package org.elshindr.server_aroundtech.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.elshindr.server_aroundtech.configs.JWTConfig;
import org.elshindr.server_aroundtech.configs.WebSecurity;
import org.elshindr.server_aroundtech.dtos.UserDto;
import org.elshindr.server_aroundtech.models.Role;
import org.elshindr.server_aroundtech.models.User;
import org.elshindr.server_aroundtech.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.elshindr.server_aroundtech.repositories.UserRepository;
import org.springframework.security.core.Authentication;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;


/**
 * The type User service.
 */
@Service
public class UserService {


    @Autowired
    private UserRepository userRepo;
    @Autowired
    private RoleRepository roleRepo;
    @Autowired
    private PasswordEncoder pwdEncoder;
    private User userCur;


    /**
     * Instantiates a new User service.
     *
     * @param wbSecurityConf the wb security conf
     */
    public UserService(WebSecurity wbSecurityConf) {
        this.pwdEncoder = wbSecurityConf.passwordEncoder();
    }


    /**
     * Construction du cookie d'authentification selon un user connecté donné
     *
     * @param userDto   utilisateur connecté.
     * @param jwtConfig the jwt config
     * @return cookie sous la forme d'une chaîne de caractères
     */
    public String buildJWTCookie(UserDto userDto, JWTConfig jwtConfig) {

        Keys.secretKeyFor(SignatureAlgorithm.HS512);

        String jetonJWT = Jwts.builder()
                .setSubject(userDto.getEmail())
                .addClaims(Map.of("roles", userDto.getRole()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtConfig.getExpireIn() * 1000))
                .signWith(jwtConfig.getSecretKey())
                .compact();

        ResponseCookie tokenCookie = ResponseCookie.from(jwtConfig.getCookie(), jetonJWT)
                .httpOnly(true)
                .maxAge(jwtConfig.getExpireIn() * 1000)
                .path("/")
                .build();

        return tokenCookie.toString();
    }


    /**
     * Getter et Setter userCur
     *
     * @return the user cur
     */
    public User getUserCur() {
        return userCur;
    }

    /**
     * Sets user cur.
     *
     * @param userCur the user cur
     */
    public void setUserCur(User userCur) {
        this.userCur = userCur;
    }

    /**
     * Find distinct by id user dto.
     *
     * @param idUser the id user
     * @return the user dto
     */
    public UserDto findDistinctById(Integer idUser){
        return UserDto.parseUserToUserDto(userRepo.findDistinctById(idUser).get(), this.userRepo);
    }

    /**
     * Find lst users list.
     *
     * @return the list
     */
    public List<UserDto> findLstUsers(){
        List<User> lstUser = this.userRepo.findAll();
        return lstUser.stream().map(user -> UserDto.parseUserToUserDto(user, this.userRepo)).toList();
    }

    /**
     * Get user info user dto.
     *
     * @param auth the auth
     * @return the user dto
     */
    public UserDto getUserInfo(Authentication auth){
        try{
                Optional<User> userOptional = this.userRepo.findDistinctByEmail((String) auth.getPrincipal())
                        .stream().findFirst();
                if (userOptional.isPresent()) {
                    return UserDto.parseUserToUserDto(userOptional.get(), this.userRepo);
                } else {
                    return null;
                }

        } catch(Exception ex){
            System.out.println(ex.getMessage());
            System.out.println(ex);
            return null;
        }
    }

    /**
     * Find lst roles list.
     *
     * @return the list
     */
    public List<Role> findLstRoles(){
        return this.roleRepo.findAll();
    }

    /**
     * Find lst managers list.
     *
     * @return the list
     */
    public List<UserDto> findLstManagers(){
        List<User> lstManagers = this.userRepo.findAllManagers().stream().toList();
        return lstManagers.stream().map(UserDto::parseUserToUserDtoManager).toList();
    }


    /**
     * Create user boolean.
     *
     * @param newUserDto the new user dto
     * @return the boolean
     */
    public Boolean createUser(UserDto newUserDto){
        try{
            User user = UserDto.parseUserDtoToUser(newUserDto, this.userRepo, this.pwdEncoder);
            this.userRepo.save(user);
            return true;
        } catch (Exception ex){
            System.out.println(ex.getMessage());
            System.out.println(ex.toString());
            return false;
        }
    }

    /**
     * Update user boolean.
     *
     * @param updUserDto the upd user dto
     * @param idUser     the id user
     * @return the boolean
     */
    public Boolean updateUser(UserDto updUserDto, Integer idUser){
        try{
            User user = this.userRepo.findDistinctById(idUser).get();
            user.setFirstname(updUserDto.getFirstname());
            user.setLastname(updUserDto.getLastname());
            user.setEmail(updUserDto.getEmail());
            user.setRole(this.roleRepo.findDistinctById(updUserDto.getRole().getId()).get());
            user.setIdManager(updUserDto.getIdManager());

            if(updUserDto.getPwd() != null && updUserDto.getPwd() != ""){
                user.setPwd(this.pwdEncoder.encode(updUserDto.getPwd()));
            }
            this.userRepo.save(user);
            return true;

        } catch (Exception ex){
            System.out.println(ex.getMessage());
            System.out.println(ex.toString());
            return false;
        }
    }

    /**
     * Delete user boolean.
     *
     * @param idUser the id user
     * @return the boolean
     */
    public  Boolean deleteUser(Integer idUser){
        if (!userRepo.existsById(idUser)) {
            return false;
        }
        userRepo.deleteById(idUser);
        return true;
    }
}