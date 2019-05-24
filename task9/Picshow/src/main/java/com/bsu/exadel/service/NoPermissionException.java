package com.bsu.exadel.service;

public class NoPermissionException extends Exception {
    public NoPermissionException(String msg){
        super(msg);
    }
}
