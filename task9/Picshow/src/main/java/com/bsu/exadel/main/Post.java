package com.bsu.exadel.main;

import java.util.*;

public class Post {

    private String author;
    private String description;
    private String hashTags;
    private String photoLink;
    private Calendar createdAt;
    private String id;
    private Set<String> likes;

    public Post() throws IllegalArgumentException {
    }

    public Post(String author, String description, String hashTags, String photoLink) throws IllegalArgumentException {

        ValidatePostHelper.checkForDescrLength(description);
        ValidatePostHelper.checkForContent(photoLink);
        hashTags = hashTags.trim().toLowerCase().replaceAll("\\W+", "");
        ValidatePostHelper.checkForTagsLen(hashTags);
        this.author = author;
        this.description = description;
        this.hashTags = hashTags;
        this.photoLink = photoLink;
        this.likes = new HashSet();
        this.createdAt = new GregorianCalendar();
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

    public void setDescription(String description) throws IllegalArgumentException{
        ValidatePostHelper.checkForDescrLength(description);
        this.description = description;
    }

    public String getHashTags() {
        return hashTags;
    }

    public void setHashTags(String hashTags) {
        ValidatePostHelper.checkForTagsLen(hashTags);
        this.hashTags = hashTags;

    }

    public String getPhotoLink() {
        return photoLink;
    }

    public void setPhotoLink(String photoLink) throws IllegalArgumentException {
        ValidatePostHelper.checkForContent(photoLink);
        this.photoLink = photoLink;
    }

    public Calendar getCreatedAt() {
        return createdAt;
    }

    public String getId() {
        return id;
    }

    public Set<String> getLikes() {
        return likes;
    }

    @Override
    public String toString() {
        StringBuffer sb = new StringBuffer();
        return sb.append("id: ").append(this.id)
                .append("author: ").append(this.author)
                .append("description: ").append(this.description)
                .append("hashTags: ").append(this.description)
                .append("likes: ").append(this.likes.toString())
                .append("createdAt: ").append(this.createdAt.toString())
                .toString();
    }

    @Override
    public int hashCode() {
        return this.id.hashCode();
    }
}

