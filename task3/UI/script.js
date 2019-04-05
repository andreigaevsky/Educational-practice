class PostsList {
    static _MIN_WORD = 10;

    static _MAX_WORD = 200;

    static _MAX_TAGS = 20;

    constructor(postsArray, user) {
        this._photoPosts = (postsArray || []);
        if (user) {
            this._user = user;
        }
     }

    savePost(){
        localStorage.setItem('posts', JSON.stringify(this._photoPosts));
    }


    clear() {
        this._photoPosts = [];
        return this._photoPosts.length;
    }

    addAll(postArray) {
        const badPosts = [];
        let len = 0;
        const f = this;
        postArray.forEach((post) => {
            if (!f.add(post)) {
                badPosts[len] = post;
                len += 1;
            }
});
        return badPosts;
    }

    get(id) {
        return this._photoPosts.find(post => post.id === id);
    }

    getPage(skip = 0, top = 10, filterConfig = undefined) {
        let filteredPosts = this._photoPosts.sort(PostsList._sortA).slice();
        if (filterConfig) {
            Object.keys(filterConfig).forEach((field) => {
                filteredPosts = PostsList._filterHelper[field](filteredPosts, filterConfig[field]);
            });
        }
        filteredPosts = filteredPosts.slice(skip, top);
        return filteredPosts;
    }


    add(post) {
        const newPost = {
            id: PostsList._nextId().toString(),
            description: post.description,
            createdAt: new Date(),
            author: this._user.name,
            photoLink: post.photoLink,
            hashTags: post.hashTags  || [],
            likes: [],
    };
        if (this.constructor._validate(newPost)) {
            this._photoPosts.push(newPost);
            this.savePost();
            return newPost;
        }
        return false;
    }

    likePost(id) {
        if(!this._user){
            return false;
        }
        const post = this.get(id);
        const likeIndex = post.likes.indexOf(this._user.name);
        if (likeIndex === -1) {
            post.likes.push(this._user.name);
            this.savePost();
            return true;
        }
            this.savePost();
            post.likes.splice(likeIndex, 1);
            return false;
    }


    edit(id, edit) {
        const post = this.get(id);
        if (!post) {
            return false;
        }
        if (!Object.keys(edit).every(field => Object.keys(PostsList._editHelper).includes(field))) {
            return false;
        }
        const editedPost = JSON.parse(JSON.stringify(post));
        Object.keys(edit).forEach((field) => {
                editedPost[field] = PostsList._editHelper[field](edit[field]);
            });

        if (!PostsList._validate(editedPost)) {
            return false;
        }
        Object.keys(edit).forEach((field) => {
            post[field] = JSON.parse(JSON.stringify(editedPost[field]));
        });
        this.savePost();
        return true;
    }

    remove(id) {
        const post = this.get(id);
        if (!post || this._photoPosts.length === 0) {
            return false;
        }
        this._photoPosts.splice(this._photoPosts.indexOf(post), 1);
        this.savePost();
        return true;
    }

    static _filterHelper ={
        author(posts, author) {
                if(author.trim().length === 0){
                    return posts;
                }
            return posts.filter(post => post.author.toLowerCase().includes(author.toLowerCase().trim()));
        },
        fromDate(posts, fromDate) {
            if(fromDate.length === 0){
                return posts;
            }
            const fDate = new Date(fromDate);
            return posts.filter(post => post.createdAt >= fDate);
        },
        toDate(posts, toDate) {
            if(toDate.length === 0){
                return posts;
            }
            const tDate = new Date(toDate);
            return posts.filter(post => post.createdAt <= tDate);
        },
        hashTags(posts, hashTags) {
            if(hashTags.trim().length === 0){
                return posts;
            }
            const tags = hashTags.toLowerCase().trim().split(/[\s,]+/);
            return posts.filter(post => tags.every(tag => PostsList._hasTag(post.hashTags, tag)));
        },
    }

    static _nextId() {
        return Math.round(new Date().getTime() + (Math.random() * 100));
    }


    static _sortA(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
    }

    static _hasTag(hashTags, tag) {
        return !!hashTags.find(hashTag => hashTag.includes(tag));
    }


    static _validateHelper = {
        description(description) {
            return description && description.length > PostsList._MIN_WORD && description.length < PostsList._MAX_WORD;
        },
        photoLink(photoLink) {
            return photoLink && typeof photoLink === 'string' && photoLink.length !== 0;
        },
        hashTags(hashTags) {
            return !!hashTags.every(item => item.length <= PostsList._MAX_TAGS);
        },
    }

    static _editHelper ={
        hashTags(hashTags) {
            return hashTags.map(tag => tag.toLowerCase().trim());
        },
        description(description) {
            return description.trim();
        },
        photoLink(photoLink) {
            return photoLink.trim();
        },
    }

    static _validate(photoPost) {
        return Object.keys(PostsList._validateHelper).every((field) => {
            return PostsList._validateHelper[field](photoPost[field]);
        });
    }
}



