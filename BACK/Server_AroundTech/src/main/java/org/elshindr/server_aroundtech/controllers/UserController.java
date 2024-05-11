package org.elshindr.server_aroundtech.controllers;

import org.elshindr.server_aroundtech.dtos.ResponseDto;
import org.elshindr.server_aroundtech.dtos.UserDto;
import org.elshindr.server_aroundtech.models.Role;
import org.elshindr.server_aroundtech.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * UserController
 * Controller des utilisateurs
 */
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userSvc;


    /**
     * Gets one user.
     *
     * @param idUser the id user
     * @return the one user
     */
    @GetMapping("{idUser}")
    public UserDto getOneUser(@PathVariable Integer idUser) {
        return userSvc.findDistinctById(idUser);
    }


    /**
     * Gets all users.
     *
     * @return the all users
     */
    @GetMapping("/all")
    //@Secured("admin")
    public List<UserDto> getAllUsers() {
        return userSvc.findLstUsers();
    }


    /**
     * Gets all roles.
     *
     * @return the all roles
     */
    @GetMapping("/allRoles")
   // @Secured("admin")
    public List<Role> getAllRoles() {
        return userSvc.findLstRoles();
    }


    /**
     * Gets all managers.
     *
     * @return the all managers
     */
    @GetMapping("/allManagers")
    //@Secured("admin")
    public List<UserDto> getAllManagers() {
        return userSvc.findLstManagers();
    }


    /**
     * Create user response entity.
     *
     * @param newUserDto the new user dto
     * @return the response entity
     */
    @PostMapping
    @Secured("admin")
    public ResponseEntity<?> createUser(@RequestBody UserDto newUserDto){
         return ResponseEntity.badRequest().body(this.userSvc.createUser(newUserDto));
    }


    /**
     * Update user response entity.
     *
     * @param upUserDto the up user dto
     * @param idUser    the id user
     * @return the response entity
     */
    @PutMapping("{idUser}")
    //@Secured("admin")
    public ResponseEntity<?> updateUser(@RequestBody UserDto upUserDto, @PathVariable Integer idUser){
        System.out.println("===================== UPDATE User:"+ upUserDto);
        boolean isOk = this.userSvc.updateUser(upUserDto, idUser);

        if (isOk) {
            return ResponseEntity.ok().body(new ResponseDto( "OK", null, 200));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto( null,"Fail", 300));

    }


    /**
     * Delete user response entity.
     *
     * @param idUser the id user
     * @return the response entity
     */
    @DeleteMapping("{idUser}")
   // @Secured("admin")
    public ResponseEntity<?> deleteUser(@PathVariable Integer idUser){
        if (this.userSvc.deleteUser(idUser)){
            return ResponseEntity.ok().body("");
        }
        return ResponseEntity.badRequest().body("");
    }
}
