package org.elshindr.server_aroundtech.configs;

import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;

/**
 * JWTConfig
 * Modele du Jeton JWT
 */
@Configuration
public class JWTConfig {

    @Value("${jwt.expires_in}")
    private long expireIn;

    @Value("${jwt.cookie}")
    private String cookie;

    @Value("${jwt.secret}")
    private String secret;

    private Key secretKey;

    /**
     * Build key.
     */
    @PostConstruct
    public void buildKey() {
        secretKey = new SecretKeySpec(Base64.getDecoder().decode(getSecret()),SignatureAlgorithm.HS256.getJcaName());
    }

    /**
     * Gets expire in.
     *
     * @return the expire in
     */
    public long getExpireIn() {
        return expireIn;
    }

    /**
     * Sets expire in.
     *
     * @param expireIn the expire in
     */
    public void setExpireIn(long expireIn) {
        this.expireIn = expireIn;
    }

    /**
     * Gets cookie.
     *
     * @return the cookie
     */
    public String getCookie() {
        return cookie;
    }

    /**
     * Sets cookie.
     *
     * @param cookie the cookie
     */
    public void setCookie(String cookie) {
        this.cookie = cookie;
    }

    /**
     * Gets secret.
     *
     * @return the secret
     */
    public String getSecret() {
        return secret;
    }

    /**
     * Sets secret.
     *
     * @param secret the secret
     */
    public void setSecret(String secret) {
        this.secret = secret;
    }

    /**
     * Gets secret key.
     *
     * @return the secret key
     */
    public Key getSecretKey() {
        return secretKey;
    }

    /**
     * Sets secret key.
     *
     * @param secretKey the secret key
     */
    public void setSecretKey(Key secretKey) {
        this.secretKey = secretKey;
    }


}