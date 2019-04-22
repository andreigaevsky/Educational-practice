package com.bsu.exadel.main;


import java.util.List;
import java.util.Map;

public class PicshowMain {
    private static User currentUser = new User("admin", "admin");

    public static boolean login(String name, String password){
        if(Users.checkUser(name, password)){
            currentUser = Users.getUser(name);
            return true;
        }
        return false;
    }

    public static void logout(){
        currentUser = null;
    }

    public static boolean changePost(String id, Map<String, String> editConfig){
        //checking current and post users
        return PostsCollection.changePost(id,editConfig);
    }

    public static boolean removePost(String id){
        final Post POST = PostsCollection.getPost(id);
        final User USER = Users.getUser(POST.getAuthor());
       /* if(!USER.equals(currentUser)){
            return false;
        }*/
        return PostsCollection.deletePost(id);
    }

    public static String addPost(String description, String hashTags, String photoLink) {
        if (currentUser == null) {
            return "unlogged";
        }
        return PostsCollection.addPost(currentUser.getName(), description, hashTags, photoLink);
    }


    public static List<Post> getFirstPosts(){
        return PostsCollection.getFirst();
    }
    public static List<Post> getNextPosts(){
        return PostsCollection.getNext();
    }

    public static Post getPostById(String id){
     return PostsCollection.getPost(id);
    }



}
