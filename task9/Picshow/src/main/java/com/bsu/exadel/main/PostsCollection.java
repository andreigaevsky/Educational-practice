package com.bsu.exadel.main;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PostsCollection {
    private static Map<String,Post> posts = new HashMap<>();
    private static int countShownPost = 0;

    public static Post getPost(String id){
        return posts.get(id);
    }
    private PostsCollection(){

    }
    public static List<Post> getFirst(){
        int highPoint = Math.min(10,posts.size());
        countShownPost = highPoint;
        return new ArrayList<>(posts.values()).subList(0,highPoint);
    }

    public static List<Post> getNext(){
        int highPoint = Math.min(countShownPost+10,posts.size());
        if(highPoint == countShownPost){
            return null;
        }
        return new ArrayList<>(posts.values()).subList(countShownPost,countShownPost = highPoint);
    }

    public static String addPost(String username, String description, String hashTags,String photoLink){
        try{

            Post newPost = new Post(username, description,hashTags,photoLink);
            posts.put(newPost.getId(),newPost);
            System.out.println(newPost.getId());
            return newPost.getId();
        }catch (IllegalArgumentException e){
            System.out.println("Error while adding post\n");
        }
        return "invalid data";
    }


    public static boolean deletePost(String id){
      return posts.remove(id) != null;
    }

    private static void setParam(Post post, Map.Entry<String,String> config){
        switch (config.getKey().toLowerCase().trim()){
            case "description":{
                post.setDescription(config.getValue().trim());
                break;
            }
            case "hashtags":{
                post.setHashTags(config.getValue().trim().toLowerCase().replaceAll("\\W+", ""));
                break;
            }
            case "photoLink":{
                post.setPhotoLink(config.getValue());
                break;
            }
        }
    }

    public static boolean changePost(String id, Map<String, String> editConfig){
        Post changedPost = new Post(posts.get(id));
        try {
            for (Map.Entry<String, String> config : editConfig.entrySet()) {
                setParam(changedPost,config);
            }
            posts.put(changedPost.getId(),changedPost);
            return true;
        }catch (IllegalArgumentException e){}
        return false;
    }






}
