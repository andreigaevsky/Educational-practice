package com.bsu.exadel.service;

import com.bsu.exadel.model.Post;

import java.util.Comparator;

public class PostsByDateComparator implements Comparator<Post> {
    @Override
    public int compare(Post o1, Post o2) {
        return o2.getCreatedAt().compareTo(o1.getCreatedAt());
    }
}
