package com.bsu.exadel.model;


import com.bsu.exadel.service.PostsByDateComparator;
import com.bsu.exadel.utils.ValidatePostHelper;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

public class PostsCollection {
    private static Map<String,Post> posts = new HashMap<>();

    public static Post getPost(String id){
        return posts.get(id);
    }

    private PostsCollection(){

    }

    private static boolean containsTag(List<String> tags, String tag){
        return tags.stream().anyMatch(o -> o.contains(tag));
    }

    private static List<Post> filterPosts(Map<String, String[]> fConfig) {
        List<Post> sorted = new  ArrayList<>(posts.values());
        for(Map.Entry<String, String[]> config: fConfig.entrySet()){
            switch (config.getKey()){
                case "author":
                    String fAuthor = config.getValue()[0].trim().toLowerCase();
                    if(fAuthor.length() > 0) {
                        sorted = sorted.stream().filter(post -> post.getAuthor().toLowerCase().contains(fAuthor))
                                .collect(Collectors.toList());
                    }
                    break;
                case "hashTags":
                    String [] fTags = config.getValue();
                    Arrays.stream(fTags).forEach(tag->tag = tag.toLowerCase().trim().replaceAll("[#]+",""));
                    List<String> tags = Arrays.stream(fTags).filter(tag->tag.length()>0).collect(Collectors.toList());
                    sorted = sorted.stream().filter(post -> tags.stream().allMatch( tag->containsTag(post.getHashTags(),tag)))
                            .collect(Collectors.toList());
                    break;
                case "fromDate":
                    try {
                        Date fFromDate = new SimpleDateFormat("yyyy-MM-dd").parse(config.getValue()[0]);
                        sorted = sorted.stream().filter(post -> post.getCreatedAt().after(fFromDate)).collect(Collectors.toList());
                    }catch (ParseException e){}
                    break;
                case "toDate":
                    try{
                    Date fToDate = new SimpleDateFormat("yyyy-MM-dd").parse(config.getValue()[0]);
                    sorted = sorted.stream().filter(post -> post.getCreatedAt().before(fToDate)).collect(Collectors.toList());
                     }catch (ParseException e){}
                    break;
            }
        }
        return sorted;
    }
    public static List<Post> getFirst(Map<String, String[]> fConfig){
        List<Post> fPosts = filterPosts(fConfig);
        int skip = Integer.parseInt(fConfig.get("skip")[0]);
        int top = Integer.parseInt(fConfig.get("top")[0]);
        fPosts.sort(new PostsByDateComparator());
        top = Math.min(fPosts.size(), skip+top);
        return fPosts.subList(skip, top);
    }


    public static String addPost(String username, String description, String hashTags,String photoLink){
        try{
            ValidatePostHelper.checkForDescrLength(description);
            ValidatePostHelper.checkForContent(photoLink);
            List<String> tags = getTags(hashTags);
            ValidatePostHelper.checkForTagsLen(tags);
            Post newPost = new Post(username, description,tags,photoLink);
            posts.put(newPost.getId(),newPost);
            System.out.println(newPost.getId());
            return newPost.getId();
        }catch (IllegalArgumentException e){
            System.out.println("Error while adding post\n");
        }
        return "fail";
    }

    public static List<String> getTags(String tags){
        return Arrays.stream(tags.trim()
                .toLowerCase()
                .replaceAll("[# ]+", "")
                .split("[,]+"))
                .filter(tag -> !tag.equals(""))
                .collect(Collectors.toList());
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
                post.setHashTags(getTags(config.getValue()));
                break;
            }
            case "photolink":{
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
