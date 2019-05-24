package com.bsu.exadel.model;

import com.bsu.exadel.service.DataSource;
import com.bsu.exadel.service.NoPermissionException;
import com.bsu.exadel.utils.ValidatePostHelper;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;
import java.util.stream.Collectors;

public class DBPostService implements IPostService {

    private static final String DB_ID = "ID";
    private static final String getUserPattern = "SELECT NAME FROM user WHERE ID = ?";
    private static final String LIKES_SELECT_DB = "SELECT user.name from likes\n" +
            "inner join user on likes.USER_ID = user.ID\n" +
            "where likes.post_id = ? and likes.user_id = user.id";
    private static final String USER_NAME_DB = "NAME";
    private static final String CONFIG_SKIP_PARAM = "skip";
    private static final String CONFIG_TOP_PARAM = "top";
    private static final String LIMIT_TWO_PARAMS_DB = "LIMIT ?, ? ";
    private static final String TAG_LAST_PART_DB = "GROUP BY POST_ID ) AS result  WHERE result.tags > (?)) ";
    private static final String POSTS_INFO_DB = "SELECT DISTINCT photo_post.POST_ID,DESCRIPTION,CREATION_DATE,PHOTO_LINK, user.NAME FROM photo_post\n" +
            "left outer JOIN user ON user.ID = photo_post.USER_ID\n" +
            "left outer JOIN hashtag ON photo_post.POST_ID = hashtag.POST_ID\n";
    private static final String THREE_WORDS_FORMAT = "%s%s%s";
    private static final String AND_DB = "AND ";
    private static final String WHERE_DB = "WHERE ";
    private static final String NAME_LIKE_DB = "NAME LIKE ? ";
    private static final String TAGS_FIRST_DB = "photo_post.POST_ID IN (SELECT POST_ID FROM (SELECT POST_ID, Count(*) AS 'tags' FROM hashtag WHERE ";
    private static final String TAG_TEXT_LIKE_DB = "TEXT LIKE (?) ";
    private static final String OR_DB = "OR ";
    private static final String FORMAT_DATE_NTIME = "yyyy-MM-dd";
    private static final String DATE_MORE_DB = "CREATION_DATE > (?) ";
    private static final String DATE_BEFORE_DB = "CREATION_DATE < (?) ";
    private static final String ORDER_DATE_DESC = "ORDER BY CREATION_DATE DESC ";
    private static final String POST_DESCR_DB = "DESCRIPTION";
    private static final String POST_ID_DB = "POST_ID";
    private static final String POST_LINK = "PHOTO_LINK";
    private static final String POST_DATE_DB = "CREATION_DATE";
    private static final String FORMAT_DATE_TIME = "yyyy-MM-dd HH:mm:ss";
    private static final String POST_INSERT_DB = "INSERT INTO photo_post (DESCRIPTION, PHOTO_LINK, USER_ID) VALUES (?, ?, ?)";
    private static final String SELECT_LAST_DB = "SELECT LAST_INSERT_ID() AS ID";
    private static final String TAG_SELECT_TEXT_DB = "SELECT TEXT FROM hashtag WHERE POST_ID = ?";
    private static final String POST_SELECT_DB = "SELECT photo_post.*, user.NAME FROM photo_post, user\n" +
            "WHERE photo_post.POST_ID = ? AND photo_post.USER_ID = user.ID";
    private static final String POST_DELETE_DB = "DELETE FROM photo_post WHERE POST_ID = ?";
    private static final String TAGS_INSERT_DB = "INSERT INTO hashtag (TEXT, POST_ID)  VALUES(?, ?)";
    private static final String LIKES_ALLSELECT_DB = "SELECT * FROM likes WHERE USER_ID = ? AND POST_ID = ?";
    private static final String LIKES_COUNT_DB = "SELECT COUNT(likes.POST_ID) as likescount FROM likes WHERE POST_ID = ?";
    private static final String DELETE_LIKES_DB = "DELETE FROM likes WHERE POST_ID = ? AND USER_ID = ?";
    private static final String LIKES_INSERT_DB = "INSERT INTO likes (USER_ID, POST_ID) VALUES (?, ?)";
    private static final String POST_UPDATE_DB = "UPDATE photo_post SET DESCRIPTION = ?, PHOTO_LINK = ? WHERE POST_ID = ?";
    private static final String TAGS_DELETE_DB = "DELETE FROM hashtag WHERE POST_ID = ?";
    private static final String ERROR_TEXT_NO_PERM = "Error: no permission";

    private String getUserName(String userId) throws SQLException {
        try (Connection connection = DataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(getUserPattern)) {
            statement.setString(1, userId);
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                return rs.getString(USER_NAME_DB);
            }
            throw new SQLException();
        }
    }

    private void checkPermission(String postId, String userId) throws NoPermissionException, SQLException {
        String curUserName = getUserName(userId);
        String postUserName = getPost(postId).getAuthor();
        if (!curUserName.equals(postUserName)) {
            throw new NoPermissionException(ERROR_TEXT_NO_PERM);
        }
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
        try (PreparedStatement statement = connection.prepareStatement(LIKES_SELECT_DB)) {
            statement.setString(1, postId);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                likes.add(rs.getString(USER_NAME_DB));
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
        if (fConfig.containsKey(CONFIG_SKIP_PARAM)) {
            try {
                skip = Integer.parseInt(fConfig.get(CONFIG_SKIP_PARAM)[0]);
            } catch (NumberFormatException e) {
            }
        }
        if (fConfig.containsKey(CONFIG_TOP_PARAM)) {
            try {
                top = Integer.parseInt(fConfig.get(CONFIG_TOP_PARAM)[0]);
            } catch (NumberFormatException e) {
            }
        }
        stPattern.append(POSTS_INFO_DB);
        StringBuilder tagsPattern = new StringBuilder();

        boolean hasConfig = false;
        for (Map.Entry<String, String[]> config : fConfig.entrySet()) {
            switch (config.getKey()) {
                case "author":
                    String fAuthor = config.getValue()[0].trim().toLowerCase();
                    if (fAuthor.length() > 0) {
                        fAuthor = String.format(THREE_WORDS_FORMAT, "%", fAuthor, "%");
                        if (hasConfig) {
                            stPattern.append(AND_DB);
                            stPattern.append(NAME_LIKE_DB);
                        } else {
                            stPattern.append(WHERE_DB);
                            stPattern.append(NAME_LIKE_DB);
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

                        tagsPattern.append(TAGS_FIRST_DB);
                        tagsPattern.append(TAG_TEXT_LIKE_DB);
                        allConfigs.add(String.format(THREE_WORDS_FORMAT, "%", tags.remove(0), "%"));
                        for (String tag : tags) {
                            tagsPattern.append(OR_DB);
                            tagsPattern.append(TAG_TEXT_LIKE_DB);
                            allConfigs.add(String.format(THREE_WORDS_FORMAT, "%", tag, "%"));
                        }
                        tagsPattern.append(TAG_LAST_PART_DB);
                        if (hasConfig) {
                            stPattern.append(AND_DB).append(tagsPattern);
                        } else {
                            stPattern.append(WHERE_DB).append(tagsPattern);
                            hasConfig = true;
                        }
                        allConfigs.add(Integer.toString(tags.size() + 1));
                    }
                    break;
                case "fromDate":
                    try {
                        Date fFromDate = new SimpleDateFormat(FORMAT_DATE_NTIME).parse(config.getValue()[0]);
                        addConfig(hasConfig, stPattern, DATE_MORE_DB);
                        hasConfig = true;
                        allConfigs.add(new SimpleDateFormat(FORMAT_DATE_NTIME).format(fFromDate));
                    } catch (ParseException e) {
                    }
                    break;
                case "toDate":
                    try {
                        Date fToDate = new SimpleDateFormat().parse(config.getValue()[0]);
                        addConfig(hasConfig, stPattern, DATE_BEFORE_DB);
                        hasConfig = true;
                        allConfigs.add(new SimpleDateFormat(FORMAT_DATE_NTIME).format(fToDate));
                    } catch (ParseException e) {
                    }
                    break;
            }

        }

        stPattern.append(ORDER_DATE_DESC);
        stPattern.append(LIMIT_TWO_PARAMS_DB);
        try (Connection connection = DataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(stPattern.toString())) {
            int i;
            for (i = 1; i <= allConfigs.size(); i++) {
                statement.setString(i, allConfigs.get(i - 1));
            }
            statement.setInt(i++, skip);
            statement.setInt(i, top);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                try {
                    allPosts.add(new Post(
                            rs.getString(USER_NAME_DB),
                            rs.getString(POST_DESCR_DB),
                            getTags(connection, rs.getString(POST_ID_DB)),
                            rs.getString(POST_LINK),
                            rs.getInt(POST_ID_DB),
                            new SimpleDateFormat(FORMAT_DATE_TIME).parse(rs.getString(POST_DATE_DB)),
                            getLikesByPostId(rs.getString(POST_ID_DB), connection)
                    ));
                } catch (ParseException e) {
                }

            }
            return allPosts;
        } catch (
                SQLException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    private void addConfig(boolean hasConfig, StringBuilder sb, String config) {
        if (hasConfig) {
            sb.append(AND_DB).append(config);
        } else {
            sb.append(WHERE_DB).append(config);
        }
    }

    @Override
    public Post addPost(String description, String hashTags, String photoLink, String userId) throws SQLException {
        try (Connection connection = DataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(POST_INSERT_DB)) {
            ValidatePostHelper.checkForDescrLength(description);
            ValidatePostHelper.checkForContent(photoLink);
            List<String> tags = getTags(hashTags);
            ValidatePostHelper.checkForTagsLen(tags);

            statement.setString(1, description);
            statement.setString(2, photoLink);
            statement.setString(3, userId);
            statement.executeUpdate();
            PreparedStatement st = connection.prepareStatement(SELECT_LAST_DB);
            ResultSet rs = st.executeQuery();
            if (rs.next()) {
                String id = rs.getString(DB_ID);
                setNewTags(connection, id, tags);
                return getPost(id);
            }
        } catch (IllegalArgumentException e) {
            System.out.println("Error while adding post\n");
        }
        return null;
    }

    private List<String> getTags(Connection connection, String id) throws SQLException {
        List<String> tags = new ArrayList<>();
        PreparedStatement statement = connection.prepareStatement(TAG_SELECT_TEXT_DB);
        statement.setString(1, id);
        ResultSet rs = statement.executeQuery();
        while (rs.next()) {
            tags.add(rs.getString("TEXT"));
        }
        return tags;
    }

    public Post getPost(String id) throws SQLException {
        try (Connection connection = DataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(POST_SELECT_DB)) {
            statement.setString(1, id);
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                try {
                    return new Post(
                            rs.getString(USER_NAME_DB),
                            rs.getString(POST_DESCR_DB),
                            getTags(connection, id),
                            rs.getString(POST_LINK),
                            rs.getInt(POST_ID_DB),
                            new SimpleDateFormat(FORMAT_DATE_TIME).parse(rs.getString(POST_DATE_DB)),
                            getLikesByPostId(id, connection)
                    );
                } catch (ParseException e) {
                }
            }
        }
        return null;
    }

    public boolean deletePost(String id, String userId) throws SQLException, NoPermissionException {
        checkPermission(id, userId);
        try (Connection connection = DataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(POST_DELETE_DB)) {
            statement.setString(1, id);
            statement.executeUpdate();
            return true;
        }
    }

    private void setNewTags(Connection connection, String id, List<String> tags) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(TAGS_INSERT_DB)) {
            for (String tag : tags) {
                statement.setString(1, tag);
                statement.setString(2, id);
                statement.executeUpdate();
            }

        }
    }

    private void deleteAllTagsByPostId(Connection connection, String id) throws SQLException {
        try (PreparedStatement statement = connection.prepareStatement(TAGS_DELETE_DB)) {
            statement.setString(1, id);
            statement.executeUpdate();
        }

    }

    public boolean editPost(String id, Map<String, String> eConfig, String userId) throws SQLException, NoPermissionException {
        checkPermission(id, userId);
        try {
            Post post = getPost(id);
            PostsCollection.setParam(post, eConfig);
            if (PostsCollection.validatePost(post)) {
                try (Connection connection = DataSource.getConnection();
                     PreparedStatement statement = connection.prepareStatement(POST_UPDATE_DB)) {
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
        try (Connection connection = DataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(LIKES_INSERT_DB)) {
            statement.setString(1, userId);
            statement.setString(2, postId);
            statement.executeUpdate();
        }
    }

    private void deleteLike(String userId, String postId) throws SQLException {
        try (Connection connection = DataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(DELETE_LIKES_DB)) {
            statement.setString(1, postId);
            statement.setString(2, userId);
            statement.executeUpdate();
        }
    }

    private int getLikesCount(String postId) throws SQLException {
        try (Connection connection = DataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(LIKES_COUNT_DB)) {
            statement.setString(1, postId);
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                return rs.getInt("likescount");
            }
            return -1;
        }
    }

    public int likePost(String postId, String userId) throws SQLException {
        try (Connection connection = DataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(LIKES_ALLSELECT_DB)) {
            statement.setString(1, userId);
            statement.setString(2, postId);
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                deleteLike(userId, postId);
            } else {
                setLike(userId, postId);
            }
            return getLikesCount(postId);
        }
    }

}
