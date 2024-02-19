package org.elshindr.server_aroundtech.dtos;


/**
 * LoginDto
 * Modele de login (Client)
 */
public class LoginDto {


    private String pwd;
    private String email;


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


    @Override
    public String toString() {
        return "LoginDto{" +
                "  pwd='" + pwd + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
