package org.elshindr.server_aroundtech.controllers;

import org.elshindr.server_aroundtech.dtos.UserDto;
import org.elshindr.server_aroundtech.models.Response;
import org.elshindr.server_aroundtech.models.Role;
import org.elshindr.server_aroundtech.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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


    @GetMapping("{idUser}")
    public UserDto getOneUser(@PathVariable Integer idUser) {
        return userSvc.findDistinctById(idUser);
    }


    @GetMapping("/all")
    public List<UserDto> getAllUsers() {
        return userSvc.findLstUsers();
    }


    @GetMapping("/allRoles")
    public List<Role> getAllRoles() {
        return userSvc.findLstRoles();
    }


    @GetMapping("/allManagers")
    public List<UserDto> getallManagers() {
        return userSvc.findLstManagers();
    }


    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserDto newUserDto){
        System.out.println("===================== CREATE User:"+ newUserDto);
        boolean isOk = this.userSvc.createUser(newUserDto);

        if (isOk) {
           return ResponseEntity.ok().body(new Response("OK"));

        }
         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur à la création de l'utilisateur");

    }


    @PutMapping("{idUser}")
    public ResponseEntity<?> updateUser(@RequestBody UserDto upUserDto, @PathVariable Integer idUser){
        System.out.println("===================== UPDATE User:"+ upUserDto);
        boolean isOk = this.userSvc.updateUser(upUserDto, idUser);

        if (isOk) {
            return ResponseEntity.ok().body(new Response("OK"));

        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur à la création de l'utilisateur");

    }


    @DeleteMapping("{idUser}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer idUser){
        if (this.userSvc.deleteUser(idUser)){
            return ResponseEntity.ok().body("");
        }
        return ResponseEntity.badRequest().body("");
    }
}
