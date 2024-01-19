package org.elshindr.server_aroundtech.dtos;


/**
 * LoginDto
 * Modele de login (Client)
 */
public class LoginDto {


    private String pwd;
    private String email;


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }


    @Override
    public String toString() {
        return "LoginDto{" +
                "  pwd='" + pwd + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
