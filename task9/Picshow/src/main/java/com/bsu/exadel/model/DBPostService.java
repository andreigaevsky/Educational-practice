package com.bsu.exadel.model;

import com.bsu.exadel.service.DataSource;
import com.bsu.exadel.utils.ValidatePostHelper;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;
import java.util.stream.Collectors;

public class DBPostService implements IPostService {
    private static User currentUser;


    public boolean login(String name, String password) throws SQLException{
        if(Users.checkUser(name, password)){
            //currentUser = Users.getUser(name);
            String getUserPattern = "SELECT ID FROM user WHERE NAME = ?";
            try (Connection connection = DataSource.getConnection();
                 PreparedStatement statement = connection.prepareStatement(getUserPattern)) {
                 statement.setString(1,name);
                ResultSet rs = statement.executeQuery();
                if(rs.next()) {
                    currentUser = new User(name, password, rs.getString("ID"));
                }
                return true;
            }

        }
        return false;
    }

    public void logOut(){
        currentUser = null;
    }

    private List<String> getTags(String tags) {
        return Arrays.stream(tags.trim()
                .toLowerCase()
                .replaceAll("[# ]+", "")
                .split("[,]+"))
                .filter(tag -> !tag.equals(""))
                .collect(Collectors.toList());
    }

    private List<String> getLikesByPostId(String postId, Connection connection) throws SQLException {
        List<String> likes = new ArrayList<>();
        String delPattern = "SELECT user.name from likes\n" +
                "inner join user on likes.USER_ID = user.ID\n" +
                "where likes.post_id = ? and likes.user_id = user.id";
        try (PreparedStatement statement = connection.prepareStatement(delPattern)) {
            statement.setString(1, postId);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                likes.add(rs.getString("name"));
            }
            return likes;
        }
    }


    @Override
    public List<Post> filterPosts(Map<String, String[]> fConfig) {
        List<String> allConfigs = new ArrayList<>();
        StringBuilder stPattern = new StringBuilder();
        List<Post> allPosts = new ArrayList<>();
        int skip = 0;
        int top = 10;
        if(fConfig.containsKey("skip")){
            try {
                skip = Integer.parseInt(fConfig.get("skip")[0]);
            }catch (NumberFormatException e){}
        }
        if(fConfig.containsKey("top")){
            try {
                top = Integer.parseInt(fConfig.get("top")[0]);
            }catch (NumberFormatException e){}
        }
        String limitPattern = "LIMIT ?, ? ";
        stPattern.append("SELECT DISTINCT photo_post.POST_ID,DESCRIPTION,CREATION_DATE,PHOTO_LINK, user.NAME FROM photo_post\n");
        stPattern.append("left outer JOIN user ON user.ID = photo_post.USER_ID\n");
        stPattern.append("left outer JOIN hashtag ON photo_post.POST_ID = hashtag.POST_ID\n");
        //  stPattern.append("left outer JOIN  (SELECT POST_ID, count(POST_ID) as LIKESCOUNT from likes group by POST_ID) as res ON res.POST_ID = photo_post.POST_ID\n");
        StringBuilder tagsPattern = new StringBuilder();
        String tagPatternLast = "group by POST_ID ) as result  where result.tags > (?)) ";
        boolean hasConfig = false;
        for (Map.Entry<String, String[]> config : fConfig.entrySet()) {
            switch (config.getKey()) {
                case "author":
                    String fAuthor = config.getValue()[0].trim().toLowerCase();
                    if (fAuthor.length() > 0) {
                        fAuthor = String.format("%s%s%s", "%", fAuthor, "%");
                        if (hasConfig) {
                            stPattern.append("and NAME LIKE ? ");
                        } else {
                            stPattern.append("WHERE NAME LIKE ? ");
                            hasConfig = true;
                        }
                        allConfigs.add(fAuthor);
                    }
                    break;
                case "hashTags":
                    String[] fTags = config.getValue();
                    fTags = fTags[0].split("[ ]+");
                    Arrays.stream(fTags).forEach(tag -> tag = tag.toLowerCase().trim().replaceAll("[#]+", ""));
                    List<String> tags = Arrays.stream(fTags).filter(tag -> tag.length() > 0).collect(Collectors.toList());
                    if (tags.size() > 0) {
                        tagsPattern.append("photo_post.POST_ID In (SELECT POST_ID FROM (SELECT POST_ID, Count(*) AS 'tags' FROM hashtag WHERE ");
                        tagsPattern.append("TEXT LIKE (?) ");
                        allConfigs.add(String.format("%s%s%s", "%", tags.remove(0), "%"));
                        for (String tag : tags) {
                            tagsPattern.append("OR TEXT LIKE (?) ");
                            allConfigs.add(String.format("%s%s%s", "%", tag, "%"));
                        }
                        tagsPattern.append(tagPatternLast);
                        if (hasConfig) {
                            stPattern.append("and ").append(tagsPattern);
                        } else {
                            stPattern.append("WHERE ").append(tagsPattern);
                            hasConfig = true;
                        }
                        allConfigs.add(Integer.toString(tags.size() + 1));
                    }
                    break;
                case "fromDate":
                    try {
                        Date fFromDate = new SimpleDateFormat("yyyy-MM-dd").parse(config.getValue()[0]);
                        if (hasConfig) {
                            stPattern.append("and CREATION_DATE > (?) ");
                        } else {
                            stPattern.append("WHERE CREATION_DATE > (?) ");
                            hasConfig = true;
                        }
                        allConfigs.add(new SimpleDateFormat("yyyy-MM-dd").format(fFromDate));
                    } catch (ParseException e) {
                    }
                    break;
                case "toDate":
                    try {
                        Date fToDate = new SimpleDateFormat("yyyy-MM-dd").parse(config.getValue()[0]);
                        if (hasConfig) {
                            stPattern.append("and CREATION_DATE < (?) ");
                        } else {
                            stPattern.append("WHERE CREATION_DATE < (?) ");
                            hasConfig = true;
                        }
                        allConfigs.add(new SimpleDateFormat("yyyy-MM-dd").format(fToDate));
                    } catch (ParseException e) {
                    }
                    break;
            }

        }
        stPattern.append("ORDER BY CREATION_DATE DESC ");
        stPattern.append(limitPattern);
            try (Connection connection = DataSource.getConnection();
                 PreparedStatement statement = connection.prepareStatement(stPattern.toString())) {
                int i ;
                for (i = 1; i <= allConfigs.size(); i++) {
                    statement.setString(i, allConfigs.get(i - 1));
                }
                statement.setInt(i++,skip);
                statement.setInt(i,top);
                ResultSet rs = statement.executeQuery();
                while (rs.next()) {
                    try {
                        allPosts.add(new Post(
                                rs.getString("name"),
                                rs.getString("description"),
                                getTags(connection, rs.getString("POST_ID")),
                                rs.getString("PHOTO_LINK"),
                                rs.getInt("POST_ID"),
                                new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(rs.getString("CREATION_DATE")),
                                getLikesByPostId(rs.getString("POST_ID"), connection)
                        ));
                    }catch (ParseException e){}

                }
                return allPosts;
        } catch (
                SQLException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    @Override
    public Post addPost( String description, String hashTags, String photoLink) {
        try (Connection connection = DataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement("INSERT INTO photo_post (DESCRIPTION, PHOTO_LINK, USER_ID)\n" +
                     "VALUES (?, ?, ?)")) {
            ValidatePostHelper.checkForDescrLength(description);
            ValidatePostHelper.checkForContent(photoLink);
            List<String> tags = getTags(hashTags);
            ValidatePostHelper.checkForTagsLen(tags);

            statement.setString(1, description);
            statement.setString(2, photoLink);
            statement.setString(3, currentUser.getId());
            statement.executeUpdate();
            PreparedStatement st = connection.prepareStatement("SELECT LAST_INSERT_ID() as ID");
            ResultSet rs = st.executeQuery();
            if(rs.next()) {
                String id = rs.getString("ID");
                setNewTags(connection, id,tags);
                return getPost(id);
            }
        } catch (SQLException e) {

            System.out.println(e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("Error while adding post\n");
        }
        return null;
    }


    private List<String> getTags(Connection connection, String id) throws SQLException {
        String tagsPattern = "SELECT TEXT FROM hashtag WHERE POST_ID = ?";
        List<String> tags = new ArrayList<>();
        PreparedStatement statement = connection.prepareStatement(tagsPattern);
        statement.setString(1, id);
        ResultSet rs = statement.executeQuery();
        while (rs.next()) {
            tags.add(rs.getString("TEXT"));
        }
        return tags;
    }


    public Post getPost(String id) {
        String postPattern = "SELECT photo_post.*, user.NAME FROM photo_post, user\n" +
                "WHERE photo_post.POST_ID = ? AND photo_post.USER_ID = user.ID";
        try (Connection connection = DataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(postPattern)) {
            statement.setString(1, id);
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                try {
                    return new Post(
                            rs.getString("NAME"),
                            rs.getString("DESCRIPTION"),
                            getTags(connection, id),
                            rs.getString("PHOTO_LINK"),
                            rs.getInt("POST_ID"),
                            new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(rs.getString("CREATION_DATE")),
                            getLikesByPostId(id, connection)
                    );
                }catch (ParseException e){}
            }
        } catch (
                SQLException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    public boolean deletePost( String id) throws SQLException {
        String delPattern = "DELETE FROM photo_post WHERE POST_ID = ?";
        try (Connection connection = DataSource.getConnection();
                PreparedStatement statement = connection.prepareStatement(delPattern)) {
            statement.setString(1, id);
            statement.executeUpdate();
            return true;
        }
    }


    public void setNewTags(Connection connection, String id, List<String> tags) throws SQLException {
        String descPattern = "INSERT INTO hashtag (TEXT, POST_ID)  VALUES(?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(descPattern)) {
            for (String tag : tags) {
                statement.setString(1, tag);
                statement.setString(2, id);
                statement.executeUpdate();
            }

        }
    }

    public void deleteAllTagsByPostId(Connection connection, String id) throws SQLException {
        String delPattern = "DELETE FROM hashtag WHERE POST_ID = ?";
        try (PreparedStatement statement = connection.prepareStatement(delPattern)) {
            statement.setString(1, id);
            statement.executeUpdate();
        }

    }


    public boolean editPost(String id, Map<String, String> eConfig) {
        String ePattern = "UPDATE photo_post SET DESCRIPTION = ?, PHOTO_LINK = ? WHERE POST_ID = ?";
        try {
            Post post = getPost(id);
            PostsCollection.setParam(post, eConfig);
            if (PostsCollection.validatePost(post)) {
                try (Connection connection = DataSource.getConnection();
                     PreparedStatement statement = connection.prepareStatement(ePattern)) {
                    statement.setString(1, post.getDescription());
                    statement.setString(2, post.getPhotoLink());
                    statement.setString(3, id);
                    statement.executeUpdate();
                    deleteAllTagsByPostId(connection, id);
                    setNewTags(connection, id, post.getHashTags());
                    return true;
                } catch (SQLException e) {
                }
            }
        } catch (IllegalArgumentException e) {
        }
        return false;
    }

    private void setLike(String userId, String postId) throws SQLException {
        String setLikePattern = "INSERT INTO likes (USER_ID, POST_ID) VALUES (?, ?)";
        try (Connection connection = DataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(setLikePattern)) {
            statement.setString(1, userId);
            statement.setString(2, postId);
            statement.executeUpdate();
        }
    }

    private void deleteLike(String userId, String postId) throws SQLException {
        String delLikePattern = "DELETE FROM likes WHERE POST_ID = ? AND USER_ID = ?";
        try (Connection connection = DataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(delLikePattern)) {
            statement.setString(1,postId);
            statement.setString(2,  userId);
            statement.executeUpdate();
        }
    }

    private int getLikesCount(String postId) throws SQLException {
        String getLikeCountPattern = "SELECT COUNT(likes.POST_ID) as likescount FROM likes WHERE POST_ID = ?";
        try (Connection connection = DataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(getLikeCountPattern)) {
            statement.setString(1, postId);
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                return rs.getInt("likescount");
            }
            return -1;
        }
    }


    public int likePost(String postId) {
        if(currentUser != null) {
            String getLikePattern = "SELECT * FROM likes WHERE USER_ID = ? AND POST_ID = ?";
            try (Connection connection = DataSource.getConnection();
                 PreparedStatement statement = connection.prepareStatement(getLikePattern)) {
                statement.setString(1, currentUser.getId());
                statement.setString(2, postId);
                ResultSet rs = statement.executeQuery();
                if (rs.next()) {
                    deleteLike(currentUser.getId(), postId);
                } else {
                    setLike(currentUser.getId(), postId);
                }
                return getLikesCount(postId);
            } catch (SQLException e) {
            }
        }
        return -1;
    }

}
