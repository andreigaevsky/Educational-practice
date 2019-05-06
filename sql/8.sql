SELECT user.NAME,photo_post.DESCRIPTION,photo_post.CREATION_DATE FROM photo_post
INNER JOIN user ON user.ID = photo_post.USER_ID
WHERE user.NAME = 'AndyVoid'
ORDER BY photo_post.CREATION_DATE;