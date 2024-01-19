package org.elshindr.server_aroundtech.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * User
 * Modele d'utilisateur (JPA)
 */
@Entity
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @NotNull
    @Column(name = "manager_id")
    private Integer idManager;

    @NotBlank
    private String lastname;

    @NotBlank
    private String firstname;

    @NotBlank
    @Column(name = "password")
    private String pwd;

    @NotBlank
    private String email;


    public User(){
    }

    public User(Integer id, @NotNull Role role, @NotNull Integer idManager, String lastname, String firstname, String pwd, String email) {
        this.id = id;
        this.role = role;
        this.idManager = idManager;
        this.lastname = lastname;
        this.firstname = firstname;
        this.pwd = pwd;
        this.email = email;
    }

    public User(@NotNull Role role, @NotNull Integer idManager, String lastname, String firstname, String pwd, String email) {
        this.role = role;
        this.idManager = idManager;
        this.lastname = lastname;
        this.firstname = firstname;
        this.pwd = pwd;
        this.email = email;
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

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", role=" + role +
                ", idManager=" + idManager +
                ", lastname='" + lastname + '\'' +
                ", firstname='" + firstname + '\'' +
                ", pwd='" + pwd + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}