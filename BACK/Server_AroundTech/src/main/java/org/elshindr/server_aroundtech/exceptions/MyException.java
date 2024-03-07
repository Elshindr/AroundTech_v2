package org.elshindr.server_aroundtech.exceptions;

public class MyException extends java.lang.Exception {

    private String models;
    private String function;
    private String why;

    public MyException(String message, String models, String function, String why) {
        super(message);
        this.models = models;
        this.function = function;
        this.why = why;
    }

    public String getModels() {
        return models;
    }

    public void setModels(String models) {
        this.models = models;
    }

    public String getFunction() {
        return function;
    }

    public void setFunction(String function) {
        this.function = function;
    }

    public String getWhy() {
        return why;
    }

    public void setCause(String cause) {
        this.why = cause;
    }

    @Override
    public String toString() {
        return "Exception{" +
                "models='" + models + '\'' +
                ", function='" + function + '\'' +
                ", why='" + why + '\'' +
                '}';
    }
}
