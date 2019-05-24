package com.bsu.exadel.model;

import com.bsu.exadel.service.NoPermissionException;
import com.bsu.exadel.service.NoUserException;
import com.google.gson.internal.bind.SqlDateTypeAdapter;
import org.omg.CORBA.NO_PERMISSION;

import javax.servlet.FilterConfig;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface IPostService {
    List<Post> filterPosts(Map<String, String[]> fConfig) throws SQLException;

    Post addPost(String description, String hashTags, String photoLink, String userId)  throws SQLException;

    boolean editPost(String id, Map<String, String> eConfig, String userId) throws SQLException, NoPermissionException;

    Post getPost(String id) throws SQLException;

    boolean deletePost(String id, String userId) throws SQLException, NoPermissionException;

    int likePost(String postId, String userId) throws SQLException;
}
