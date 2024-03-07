package org.elshindr.server_aroundtech.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Objects;

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


    /**
     * Instantiates a new JPA User.
     */
    public User(){
    }

    /**
     * Instantiates a new User.
     *
     * @param role      the role
     * @param idManager the id manager
     * @param lastname  the lastname
     * @param firstname the firstname
     * @param pwd       the pwd
     * @param email     the email
     */
    public User(@NotNull Role role, @NotNull Integer idManager, String lastname, String firstname, String pwd, String email) {
        this.role = role;
        this.idManager = idManager;
        this.lastname = lastname;
        this.firstname = firstname;
        this.pwd = pwd;
        this.email = email;
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
     * Instantiates a new User.
     *
     * @param id        the id
     * @param role      the role
     * @param idManager the id manager
     * @param lastname  the lastname
     * @param firstname the firstname
     * @param pwd       the pwd
     * @param email     the email
     */
    public User(Integer id, @NotNull Role role, @NotNull Integer idManager, String lastname, String firstname, String pwd, String email) {
        this.id = id;
        this.role = role;
        this.idManager = idManager;
        this.lastname = lastname;
        this.firstname = firstname;
        this.pwd = pwd;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User user)) return false;
        return Objects.equals(getId(), user.getId()) && Objects.equals(getRole().getId(), user.getRole().getId()) && Objects.equals(getIdManager(), user.getIdManager()) && Objects.equals(getLastname(), user.getLastname()) && Objects.equals(getFirstname(), user.getFirstname()) && Objects.equals(getPwd(), user.getPwd()) && Objects.equals(getEmail(), user.getEmail());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getRole(), getIdManager(), getLastname(), getFirstname(), getPwd(), getEmail());
    }
}