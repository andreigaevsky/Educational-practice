package com.bsu.exadel.main;

public class User {
    private String name;
    private transient String password;

    public User(){
    }
    public User(String name, String password){
        this.name = name;
        this.password = password;
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
        return user.name.equals(this.name) && user.password.equals(this.password) ;
    }
@Override
    public int hashCode() {
        return name.hashCode();
    }
}
