package com.bsu.exadel.model;

import javax.servlet.FilterConfig;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface IPostService {
    List<Post> filterPosts(Map<String, String[]> fConfig);

    Post addPost(String description, String hashTags,String photoLink) throws SQLException;

  /*  Post editPost(int id, Post newPost);

    Post getPost(int id);

    boolean deletePost(int id);*/
}
