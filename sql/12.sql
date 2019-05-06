SELECT  user.*, post.`count` as ninthMayPostsCount FROM user
LEFT JOIN (SELECT USER_ID, COUNT(*) as `count`, CREATION_DATE
            FROM photo_post
            GROUP BY photo_post.USER_ID
			HAVING DAY(CREATION_DATE) = 9 AND MONTH(CREATION_DATE) = 5
) post
ON user.ID = post.USER_ID