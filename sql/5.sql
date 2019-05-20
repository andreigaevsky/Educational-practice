SELECT   user.*, count(photo_post.USER_ID) as 'count of posts'
FROM  user
left outer JOIN photo_post ON
 user.ID = photo_post.USER_ID
group by user.id