package org.elshindr.server_aroundtech.dtos;

import org.springframework.http.HttpStatus;

/**
 * The type Response.
 */
public class ResponseDto {
    private String message;
    private Object obj;
    private int code;

    /**
     * Generate response
     *
     * @param message
     * @param obj
     * @param code
     */
    public ResponseDto(String message, Object obj, int code) {
        this.message = message;
        this.obj = obj;
        this.code = code;
    }


    /**
     * Get success ResponseDto
     * @param obj Object
     * @return ResponseDto
     */
    public static ResponseDto getSuccessResponse(Object obj){
        return new ResponseDto("OK", obj, HttpStatus.OK.value());
    }


    /**
     * Get not found exception ResponseDto
     * @param obj Object
     * @return ResponseDto
     */
    public static ResponseDto getNotFoundResponse(Object obj, String message){
        return new ResponseDto(message, obj, HttpStatus.NOT_FOUND.value());
    }

    /**
     * Get not found exception ResponseDto
     * @param obj Object
     * @return ResponseDto
     */
    public static ResponseDto getErrorResponse(Object obj, String message){
        return new ResponseDto(message, obj, HttpStatus.BAD_REQUEST.value());
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


    public Object getObj() {
        return obj;
    }

    public void setObj(Object obj) {
        this.obj = obj;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int numStatus) {
        this.code = numStatus;
    }


    @Override
    public String toString() {
        return "Response{" +
                "message='" + message + '\'' +
                ", obj=" + obj +
                ", code=" + code +
                '}';
    }
}
