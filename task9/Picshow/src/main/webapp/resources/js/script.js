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

    static async getById(id) {
        const response = await fetch("/photo-post?id=" + id, {method: "GET"});
        if (response.status === 200) {
            return  await response.json();
        }
        throw new Error(response.status.toString());
    }

    static async getPage(skip = 0, top = 10, filterConfig = undefined) {
        let url = '/photoposts?skip=' + skip + '&top=' + top;
        if (filterConfig) {
            Object.keys(filterConfig).forEach(config => {
                let con = filterConfig[config].trim().toLowerCase();
                if (con.length) {
                    url = url + "&" + config + "=" + con;
                }
            });
        }
        const response = await fetch(url, {method: "GET"});
        if (response.status === 200) {
            return await response.json();
        }
        throw new Error(response.status.toString());
    }

    static getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }


    static async addPost(post) {
        let answer = {answer: "fail"};
        if (!PostsList.validatePost(post)) {
            return answer;
        }
        const response = await fetch('/photo-post', {
            body: PostsList.getFormData(post),
            method: "POST"
        });
        if (response.status === 200) {
            return  await response.json();
        }
        throw new Error(response.status.toString());
    }

    static async loadPhoto(formData) {
        const response = await fetch('/photo', {
            body: formData,
            enctype: "multipart/form-data",
            name: "file",
            type: "file",
            method: "POST"
        });
        if (response.status === 200) {
            return await response.json();
        }
        throw new Error(response.status.toString());
    }

    static async getPhoto(name) {
        const response = await fetch("/photo?filename=" + name, {method: "GET"});
        if (response.status === 200) {
            return await response.json();
        }
        throw new Error(response.status.toString());
    }


    static async likePost(id) {
        const response = await fetch("/photo-post/like?id=" + id, {method: "POST"});
        if (response.status === 200) {
            return await response.json();
        }
        throw new Error(response.status.toString());
    }


    static async edit(id, edit) {
        const post = await PostsList.getById(id);
        let answer = {answer: "fail"};
        if (!post) {
            return answer;
        }
        if (!Object.keys(edit).every(field => Object.keys(PostsList._editHelper).includes(field))) {
            return answer;
        }
        Object.keys(edit).forEach((field) => {
            post[field] = PostsList._editHelper[field](edit[field]);
        });
        if (!PostsList.validatePost(post)) {
            return answer;
        }
        const response = await fetch("/photo-post?id=" + id, {
            body: PostsList.getFormData(post),
            method: "PUT"
        });
        if (response.status === 200) {
            return  await response.json();
        }
        throw new Error(response.status.toString());
    }

    static async remove(id) {
        const response = await fetch("/photo-post?id=" + id, {method: "DELETE"});
        if (response.status === 200) {
            return  await response.json();
        }
        throw new Error(response.status.toString());
    }

    static async login(user) {
        const response = await fetch("/login", {
            body: PostsList.getFormData(user),
            method: "POST"
        });
        if (response.status === 200) {
            return await response.json();
        }
        throw new Error(response.status.toString());
    }

    getByDescription(part) {
        return this._photoPosts.filter(post => post.description.includes(part));
    }

    static _validateHelper = {
        description(description) {
            return description && description.length > PostsList._MIN_WORD && description.length < PostsList._MAX_WORD;
        },
        hashTags(hashTags) {
            return !!hashTags.every(item => item.length <= PostsList._MAX_TAGS);
        },
    };

    static _editHelper = {
        hashTags(hashTags) {
            return hashTags.map(tag => tag.toLowerCase().trim());
        },
        description(description) {
            return description.trim();
        },
        photoLink(photoLink) {
            return photoLink.trim();
        },
    };

    static validatePost(photoPost) {
        return Object.keys(PostsList._validateHelper)
            .every(field => PostsList._validateHelper[field](photoPost[field]));
    }
}
