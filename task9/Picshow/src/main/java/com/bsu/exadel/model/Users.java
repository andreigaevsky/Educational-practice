package com.bsu.exadel.model;



import java.util.HashMap;
import java.util.Map;

public class Users {
    private static Map<String, User> users = new HashMap<>();

  /*  public static boolean addUser(String name, String password){
           if(users.containsKey(name)){
               return false;
           }
           users.put(name, new User(name, password));
           return true;
    }*/

    public static boolean loadUsersDB(){
        //coming soon
        return false;
    }

    public static boolean checkUser(String name, String password){
       /* final User USER = users.get(name);
        if(USER == null || !USER.getPassword().equals(password)){
            return false;
        }*/
        return true;
    }

    public static User getUser(String name){
        return users.get(name);
    }


}
