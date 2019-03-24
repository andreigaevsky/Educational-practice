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
            posts.forEach(post => wall.append(this._buildPost(post, this)));
            const morePostsBtn = document.getElementsByClassName('btn-more-photo');
            if (this.amountPosts > 0 && this.amountPosts !== this._photoPosts.length) {
                morePostsBtn[0].style.display = 'block';
            } else {
                morePostsBtn[0].style.display = 'none';
            }
            return true;
    }

    _buildPost(post, that) {
        const fragment = document.importNode(
            that.TEMPLATE.content,
            true,
        );
        const newPost = fragment.firstElementChild;
        newPost.id = post.id;
        newPost.querySelector('.u-name').textContent = post.author;
        newPost.querySelector('.post-describe').textContent = post.description;
        newPost.querySelector('.post-time').textContent = `${post.createdAt.toLocaleDateString()}, ${post.createdAt.toLocaleTimeString()}`;
        newPost.querySelector('.post-photo').src = post.photoLink;
        if (this._user && post.likes.includes(this._user.name)) {
            newPost.querySelector('.like-ph').src = 'images/liked.png';
        } else {
            newPost.querySelector('#like-btn').disabled = true;
        }
        newPost.querySelector('.count-likes').textContent = post.likes.length;
        if (that._user && that._user.name == post.author) {
            newPost.querySelector('.post-delete-btn').style.display = 'block';
            newPost.querySelector('.post-edit-btn').style.display = 'block';
        }
        const tags = newPost.querySelector('.tags');
        post.hashTags.forEach((tag) => {
            const href = document.createElement('a');
            href.innerText = `#${tag}`;
            href.className = 'tag-class';
            href.setAttribute('href', '');
            tags.append(href);
        });
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
        while (wall.firstChild) {
            wall.removeChild(wall.firstChild);
        }
        posts.forEach(post => wall.append(this._buildPost(post, this)));
        this.amountPosts = posts.length;
        const morePostsBtn = document.getElementsByClassName('btn-more-photo');
        if (this.amountPosts > 0 && this.amountPosts !== this._photoPosts.length) {
            morePostsBtn[0].style.display = 'block';
        } else {
            morePostsBtn[0].style.display = 'none';
        }
    }

    showMorePosts() {
        const wall = document.getElementById('posts-wall');
        const nextPosts = this._postsList.getPage(this.amountPosts, this.amountPosts + 10);
        nextPosts.forEach(post => wall.append(this._buildPost(post, this)));
        this.amountPosts += nextPosts.length;
        const morePostsBtn = document.getElementsByClassName('btn-more-photo');
        if (this.amountPosts !== this._photoPosts.length) {
            morePostsBtn[0].style.display = 'block';
        } else {
            morePostsBtn[0].style.display = 'none';
        }
     }

     likePost(id) {
         const post = document.getElementById(id);
         post.querySelector('.like-ph').src = 'images/liked.png';
         post.querySelector('.count-likes').innerText = +post.querySelector('.count-likes').innerText + 1;
     }

     unlikePost(id) {
         const post = document.getElementById(id);
         post.querySelector('.like-ph').src = 'images/like.png';
         post.querySelector('.count-likes').innerText = +post.querySelector('.count-likes').innerText - 1;
     }
}
