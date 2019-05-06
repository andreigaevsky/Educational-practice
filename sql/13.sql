SELECT  user.NAME as todayPublishers FROM user
INNER JOIN (SELECT USER_ID, COUNT(*) as `count`, CREATION_DATE
            FROM photo_post
            GROUP BY photo_post.USER_ID
			HAVING DATE(CREATION_DATE) = DATE(NOW())
) post
ON user.ID = post.USER_ID