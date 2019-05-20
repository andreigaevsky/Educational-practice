package com.bsu.exadel.model;



import com.bsu.exadel.utils.ValidatePostHelper;


import java.util.*;
import java.util.stream.Collectors;

public class  PostsCollection {


    private PostsCollection(){

    }


    public static List<String> getTags(String tags){
        return Arrays.stream(tags.trim()
                .toLowerCase()
                .replaceAll("[# ]+", "")
                .split("[,]+"))
                .filter(tag -> !tag.equals(""))
                .collect(Collectors.toList());
    }

    public static Post setParam(Post post, Map<String,String> allConfig){
        for(Map.Entry<String,String> config: allConfig.entrySet()) {
            switch (config.getKey().toLowerCase().trim()) {
                case "description": {
                    post.setDescription(config.getValue().trim());
                    break;
                }
                case "hashtags": {
                    post.setHashTags(getTags(config.getValue()));
                    break;
                }
                case "photolink": {
                    post.setPhotoLink(config.getValue());
                    break;
                }
            }
        }
        return post;
    }

    public static boolean validatePost(Post post){
        try{
            ValidatePostHelper.checkForContent(post.getPhotoLink());
            ValidatePostHelper.checkForDescrLength(post.getDescription());
            ValidatePostHelper.checkForTagsLen(post.getHashTags());
            return true;
        }catch(IllegalArgumentException error){
        }
        return false;
    }






}
