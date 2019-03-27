class ViewHeader {
    static updateHeader(user) {
        const logBtn = document.getElementById('head-btn');
        const username = document.getElementById('head-user');
        const addPostBtn = document.getElementById('post-create');
        if (user) {
            logBtn.innerHTML = 'Log out';
            username.innerHTML = user.name;
            addPostBtn.hidden = false;
        } else {
            logBtn.innerHTML = 'Log in';
            username.innerHTML = '';
            addPostBtn.hidden = true;
        }
    }

    static showFilter() {
        const filterPanel = document.getElementById('flt-panel');
        filterPanel.style.display = filterPanel.style
            .getPropertyValue('display') === 'none' ? 'block' : 'none';
    }
}

class View {
    constructor(postsArray, user) {
        this._postsList = new PostsList(postsArray, user);
        this._photoPosts = this._postsList._photoPosts;
        this._user = user;
        this.amountPosts = 0;
        this.TEMPLATE = document.getElementById('post-template');
        this.TAGS = document.getElementById('post-tag');
        ViewHeader.updateHeader(user);
        this.showPosts(this._postsList.getPage());
    }

    remove(id) {
        const node = document.getElementById(id);
        const wall = document.getElementById('posts-wall');
        this._postsList.remove(id);
        if (!node) {
            return false;
        }
        wall.removeChild(node);
        this.amountPosts -= 1;
            const posts = this._postsList.getPage(this.amountPosts, this.amountPosts + 1);
            posts.forEach((post) => { wall.append(this._buildPost(post, this)); });
            this._setBtnMorePosts();
            return true;
    }

    _setBtnMorePosts() {
        const morePostsBtn = document.getElementsByClassName('btn-more-photo');
        morePostsBtn[0].style.display = this.amountPosts === this._photoPosts.length
            ? 'none' : 'block';
    }

    _buildTags(hashTag, tagsTemplate) {
        const fragment = document.importNode(
            tagsTemplate.content,
            true,
        );
        const newTag = fragment.firstElementChild;
        newTag.innerText = hashTag;
        return newTag;
    }

    _setUserOptions(user, newPost, post) {
        if (user) {
            if (user.name === post.author) {
                newPost.querySelector('.post-delete-btn').style.display = 'block';
                newPost.querySelector('.post-edit-btn').style.display = 'block';
            }
            if (post.likes.includes(user.name)) {
                newPost.querySelector('.like-ph').src = 'images/liked.png';
            }
        } else {
            newPost.querySelector('#like-btn').disabled = true;
        }
    }

    _buildPost(post, that) {
        const fragment = document.importNode(that.TEMPLATE.content, true);
        const newPost = fragment.firstElementChild;
        newPost.id = post.id;
        newPost.querySelector('.u-name').textContent = post.author;
        newPost.querySelector('.post-describe').textContent = post.description;
        newPost.querySelector('.post-time').textContent = `${post.createdAt.toLocaleDateString()}, 
        ${post.createdAt.toLocaleTimeString()}`;
        newPost.querySelector('.post-photo').src = post.photoLink;
        newPost.querySelector('.count-likes').textContent = post.likes.length;
        this._setUserOptions(this._user, newPost, post);
        const tags = newPost.querySelector('.tags');
        post.hashTags.forEach((tag) => { tags.append(that._buildTags(tag, that.TAGS)); });
        return newPost;
    }

    setNewPostsList(photoArray) {
        this._postsList = new PostsList(photoArray);
        this._photoPosts = this._postsList._photoPosts;
        const page = this._postsList.getPage();
        this.showPosts(page);
        this.amountPosts = page.length;
    }

    showPosts(posts) {
        const wall = document.getElementById('posts-wall');
        wall.innerHTML = '';
        posts.forEach((post) => { wall.append(this._buildPost(post, this)); });
        this.amountPosts = posts.length;
        this._setBtnMorePosts();
    }

    showMorePosts() {
        const wall = document.getElementById('posts-wall');
        const nextPosts = this._postsList.getPage(this.amountPosts, this.amountPosts + 10);
        nextPosts.forEach((post) => { wall.append(this._buildPost(post, this)); });
        this.amountPosts += nextPosts.length;
        this._setBtnMorePosts();
     }

     toggleLike(id, countLikes) {
         const post = document.getElementById(id);
         const likeImg = post.querySelector('.like-ph');
         likeImg.src = likeImg.src.includes('liked')
             ? 'images/like.png' : 'images/liked.png';
         post.querySelector('.count-likes').innerText = countLikes;
     }
}
