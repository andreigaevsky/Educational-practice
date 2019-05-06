SELECT COUNT(photo_post.USER_ID) AS countOfPosts,  user.* 
FROM ( user
INNER JOIN photo_post ON
photo_post.USER_ID = user.ID)
GROUP BY photo_post.USER_ID
HAVING COUNT(photo_post.USER_ID) > 3;