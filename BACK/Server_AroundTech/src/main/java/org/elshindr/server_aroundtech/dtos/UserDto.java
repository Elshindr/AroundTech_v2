package org.elshindr.server_aroundtech.dtos;

import org.elshindr.server_aroundtech.models.Role;
import org.elshindr.server_aroundtech.models.User;
import org.elshindr.server_aroundtech.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * UserDto
 * Modele d'utilisateur (Client)
 */
public class UserDto {

    private Integer id;
    private Role role;
    private Integer idManager;
    private String nameManager;
    private String lastname;
    private String firstname;
    private String email;
    private String pwd = "";

    public UserDto() {
    }

    public UserDto(Integer id, Role role, Integer idManager, String nameManager, String lastname, String firstname, String email) {
        this.id = id;
        this.role = role;
        this.idManager = idManager;
        this.nameManager = nameManager;
        this.lastname = lastname;
        this.firstname = firstname;
        this.email = email;
    }

    public UserDto(Integer id, Role role, Integer idManager, String nameManager, String lastname, String firstname, String email, String pwd) {
        this.id = id;
        this.role = role;
        this.idManager = idManager;
        this.nameManager = nameManager;
        this.lastname = lastname;
        this.firstname = firstname;
        this.email = email;
        this.pwd = pwd;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Integer getIdManager() {
        return idManager;
    }

    public void setIdManager(Integer idManager) {
        this.idManager = idManager;
    }

    public String getNameManager() {
        return nameManager;
    }

    public void setNameManager(String nameManager) {
        this.nameManager = nameManager;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public static UserDto parseUserToUserDto(User user, UserRepository userRepo){
        User manager = userRepo.findDistinctById(user.getId()).get();
        return new UserDto(user.getId(),user.getRole(),user.getIdManager(), manager.getFirstname()+" "+ manager.getLastname(),user.getLastname(), user.getFirstname(), user.getEmail());

    }

    public static User parseUserDtoToUser(UserDto userDto, UserRepository userRepo, PasswordEncoder pwdEncoder){
        String pwd = pwdEncoder.encode(userDto.getPwd());
        return new User(userDto.getRole(), userDto.getIdManager(), userDto.getLastname(), userDto.getFirstname(), pwd, userDto.getEmail());
    }

    public static UserDto parseUserToUserDtoManager(User user){
        return new UserDto(user.getId(),user.getRole(),null, null, user.getLastname(), user.getFirstname(), null);
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "id=" + id +
                ", role=" + role +
                ", idManager=" + idManager +
                ", nameManager='" + nameManager + '\'' +
                ", lastname='" + lastname + '\'' +
                ", firstname='" + firstname + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
