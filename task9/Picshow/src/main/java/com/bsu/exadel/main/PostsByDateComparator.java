package com.bsu.exadel.main;

import java.util.Comparator;

public class PostsByDateComparator implements Comparator<Post> {
    @Override
    public int compare(Post o1, Post o2) {
        return o1.getCreatedAt().compareTo(o2.getCreatedAt());
    }
}
