package com.bsu.exadel.model;

public class User {
    private String name;
    private transient String password;
    private String id;

    public User(){
    }
    public User(String name, String password, String id){
        this.name = name;
        this.password = password;
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

@Override
    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }
        if (!(o instanceof User)) {
            return false;
        }
        User user = (User)o;
        return user.name.equals(this.name) && user.password.equals(this.password);
    }
@Override
    public int hashCode() {
        return id.hashCode();
    }
}
