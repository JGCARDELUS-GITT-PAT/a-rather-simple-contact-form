package com.jgcardelus.contactForm;

public class MyException extends Exception {
    private String message;

    public MyException(String message) {
        super();
        this.setMessage(message);
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


}
