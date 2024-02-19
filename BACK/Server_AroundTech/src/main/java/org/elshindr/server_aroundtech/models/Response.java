package org.elshindr.server_aroundtech.models;

/**
 * The type Response.
 */
public class Response {
    private String message;

    /**
     * Instantiates a new Response.
     *
     * @param message the message
     */
    public Response(String message) {
        this.message = message;
    }

    /**
     * Gets message.
     *
     * @return the message
     */
    public String getMessage() {
        return message;
    }

    /**
     * Sets message.
     *
     * @param message the message
     */
    public void setMessage(String message) {
        this.message = message;
    }
}
