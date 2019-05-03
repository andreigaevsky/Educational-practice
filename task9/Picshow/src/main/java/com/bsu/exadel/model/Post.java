package com.bsu.exadel.model;

import com.bsu.exadel.utils.ValidatePostHelper;

import java.util.*;

public class Post {

    private String author;
    private String description;
    private ArrayList<String> hashTags;
    private String photoLink;
    private Date createdAt;
    private String id;
    private Set<String> likes;

    public Post() throws IllegalArgumentException {
    }

    public Post(String author, String description, List<String> hashTags, String photoLink) {
        this.author = author;
        this.description = description;
        this.hashTags = new ArrayList<>(hashTags);
        this.photoLink = photoLink;
        this.likes = new HashSet<>();
        this.createdAt = new Date();
        this.id = UUID.randomUUID().toString();
    }

    public Post(Post other) {
        this.author = other.author;
        this.description = other.description;
        this.hashTags = other.hashTags;
        this.photoLink = other.photoLink;
        this.likes = other.likes;
        this.createdAt = other.createdAt;
        this.id = other.id;
    }


    public String getAuthor() {
        return author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) throws IllegalArgumentException {
        ValidatePostHelper.checkForDescrLength(description);
        this.description = description;
    }

    public ArrayList<String> getHashTags() {
        return hashTags;
    }

    public void setHashTags(List<String> hashTags) {
        ArrayList<String> tags = new ArrayList<>(hashTags);
        ValidatePostHelper.checkForTagsLen(tags);
        this.hashTags = tags;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public void setPhotoLink(String photoLink) throws IllegalArgumentException {
        ValidatePostHelper.checkForContent(photoLink);
        this.photoLink = photoLink;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public String getId() {
        return id;
    }

    public int getCountLikes() {
        return likes.size();
    }

    public int setLike(String username){
        if(likes.contains(username)){
            likes.remove(username);
            return likes.size();
        }
        likes.add(username);
        return likes.size();
    }

    @Override
    public String toString() {
        StringBuffer sb = new StringBuffer();
        return sb.append("id: ").append(this.id)
                .append("author: ").append(this.author)
                .append("description: ").append(this.description)
                .append("hashTags: ").append(this.hashTags.toString())
                .append("likes: ").append(this.likes.toString())
                .append("createdAt: ").append(this.createdAt.toString())
                .toString();
    }

    @Override
    public int hashCode() {
        return this.id.hashCode();
    }
}

