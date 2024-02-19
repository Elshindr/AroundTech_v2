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

    /**
     * Instantiates a new User dto.
     */
    public UserDto() {
    }

    /**
     * Instantiates a new User dto.
     *
     * @param id          the id
     * @param role        the role
     * @param idManager   the id manager
     * @param nameManager the name manager
     * @param lastname    the lastname
     * @param firstname   the firstname
     * @param email       the email
     */
    public UserDto(Integer id, Role role, Integer idManager, String nameManager, String lastname, String firstname, String email) {
        this.id = id;
        this.role = role;
        this.idManager = idManager;
        this.nameManager = nameManager;
        this.lastname = lastname;
        this.firstname = firstname;
        this.email = email;
    }

    /**
     * Instantiates a new User dto.
     *
     * @param id          the id
     * @param role        the role
     * @param idManager   the id manager
     * @param nameManager the name manager
     * @param lastname    the lastname
     * @param firstname   the firstname
     * @param email       the email
     * @param pwd         the pwd
     */
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

    /**
     * Gets email.
     *
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets email.
     *
     * @param email the email
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets lastname.
     *
     * @return the lastname
     */
    public String getLastname() {
        return lastname;
    }

    /**
     * Sets lastname.
     *
     * @param lastname the lastname
     */
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    /**
     * Gets firstname.
     *
     * @return the firstname
     */
    public String getFirstname() {
        return firstname;
    }

    /**
     * Sets firstname.
     *
     * @param firstname the firstname
     */
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    /**
     * Gets id.
     *
     * @return the id
     */
    public Integer getId() {
        return id;
    }

    /**
     * Sets id.
     *
     * @param id the id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Gets role.
     *
     * @return the role
     */
    public Role getRole() {
        return role;
    }

    /**
     * Sets role.
     *
     * @param role the role
     */
    public void setRole(Role role) {
        this.role = role;
    }

    /**
     * Gets id manager.
     *
     * @return the id manager
     */
    public Integer getIdManager() {
        return idManager;
    }

    /**
     * Sets id manager.
     *
     * @param idManager the id manager
     */
    public void setIdManager(Integer idManager) {
        this.idManager = idManager;
    }

    /**
     * Gets name manager.
     *
     * @return the name manager
     */
    public String getNameManager() {
        return nameManager;
    }

    /**
     * Sets name manager.
     *
     * @param nameManager the name manager
     */
    public void setNameManager(String nameManager) {
        this.nameManager = nameManager;
    }

    /**
     * Gets pwd.
     *
     * @return the pwd
     */
    public String getPwd() {
        return pwd;
    }

    /**
     * Sets pwd.
     *
     * @param pwd the pwd
     */
    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    /**
     * Parse user to user dto user dto.
     *
     * @param user     the user
     * @param userRepo the user repo
     * @return the user dto
     */
    public static UserDto parseUserToUserDto(User user, UserRepository userRepo){
        User manager = userRepo.findDistinctById(user.getId()).get();
        return new UserDto(user.getId(),user.getRole(),user.getIdManager(), manager.getFirstname()+" "+ manager.getLastname(),user.getLastname(), user.getFirstname(), user.getEmail());

    }

    /**
     * Parse user dto to user user.
     *
     * @param userDto    the user dto
     * @param userRepo   the user repo
     * @param pwdEncoder the pwd encoder
     * @return the user
     */
    public static User parseUserDtoToUser(UserDto userDto, UserRepository userRepo, PasswordEncoder pwdEncoder){
        String pwd = pwdEncoder.encode(userDto.getPwd());
        return new User(userDto.getRole(), userDto.getIdManager(), userDto.getLastname(), userDto.getFirstname(), pwd, userDto.getEmail());
    }

    /**
     * Parse user to user dto manager user dto.
     *
     * @param user the user
     * @return the user dto
     */
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
