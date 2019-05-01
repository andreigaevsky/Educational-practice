package com.bsu.exadel.service;


import com.bsu.exadel.model.Post;
import com.bsu.exadel.model.PostsCollection;
import com.bsu.exadel.model.User;
import com.bsu.exadel.model.Users;

import java.util.List;
import java.util.Map;

public class PicshowMainService {
    private static User currentUser;

    public PicshowMainService(){

    }

    public boolean login(String name, String password){
        if(Users.checkUser(name, password)){
            //currentUser = Users.getUser(name);
            currentUser = new User(name,password);
            return true;
        }
        return false;
    }

    public  void logout(){
        currentUser = null;
    }

    public boolean changePost(String id, Map<String, String> editConfig){
        //checking current and post users
        return PostsCollection.changePost(id,editConfig);
    }

    public int likePost(String id){
        Post post = PostsCollection.getPost(id);
        if(post == null){
            return -1;
        }
        return post.setLike(currentUser.getName());
    }

    public boolean removePost(String id){
       // Post post = PostsCollection.getPost(id);
       // User user = Users.getUser(post.getAuthor());
       /* if(!USER.equals(currentUser)){
            return false;
        }*/
        return PostsCollection.deletePost(id);
    }

    public String addPost(String description, String hashTags, String photoLink) {
        if (currentUser == null) {
            return "unlogged";
        }
        return PostsCollection.addPost(currentUser.getName(), description, hashTags, photoLink);
    }


    public List<Post> getFirstPosts(Map<String, String[]> fConfig){
        return PostsCollection.getFirst(fConfig);
    }


    public Post getPostById(String id){
     return PostsCollection.getPost(id);
    }



}
