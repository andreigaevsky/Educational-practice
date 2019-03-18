class PostsList {
    static _MIN_WORD = 10;

    static _MAX_WORD = 200;

    static _MAX_TAGS = 20;

    constructor(postsArray) {
        this._photoPosts = (postsArray || []);
        this._username = 'Back Time';
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
        let filteredPosts = this._photoPosts.slice();
        if (filterConfig) {
            Object.keys(filterConfig).forEach((field) => {
                filteredPosts = PostsList._filterHelper[field](filteredPosts, filterConfig[field]);
            });
        }
        filteredPosts = filteredPosts.slice(skip, skip + top);
        return filteredPosts.sort(PostsList._sortA);
    }


    add(post) {
        const newPost = {
            id: PostsList._nextId().toString(),
            description: post.description,
            createdAt: new Date(),
            author: this._username,
            photoLink: post.photoLink,
            hashTags: (post.hashTags && post.hashTags.map(tag => tag.toLowerCase().trim())) || [],
            likes: [],
    };
        if (this.constructor._validate(newPost)) {
            this._photoPosts.push(newPost);
            return true;
        }
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
        return true;
    }

    remove(id) {
        const post = this.get(id);
        if (!post || this._photoPosts.length === 0) {
            return false;
        }
        this._photoPosts.splice(this._photoPosts.indexOf(post), 1);
        return true;
    }

    static _filterHelper ={
        author(posts, author) {
            return posts.filter(post => post.author.toLowerCase().includes(author.toLowerCase().trim()));
        },
        fromDate(posts, fromDate) {
            const fDate = new Date(fromDate);
            return posts.filter(post => post.createdAt >= fDate);
        },
        toDate(posts, toDate) {
            const tDate = new Date(toDate);
            return posts.filter(post => post.createdAt <= tDate);
        },
        hashTags(posts, hashTags) {
            const tags = hashTags.toLowerCase().trim().split(/[\s,]+/);
            return posts.filter(post => tags.every(tag => PostsList._hasTag(post.hashTags, tag)));
        },
    }

    static _nextId() {
        return Math.round(new Date().getTime() + (Math.random() * 100));
    }


    static _sortA(a, b) {
        return b.createdAt - a.createdAt;
    }

    static _hasTag(hashTags, tag) {
        return !!hashTags.find(hashTag => hashTag.includes(tag));
    }


    static _validateHelper = {
        id(id) {
            return typeof id === 'string' && id.length > 0;
        },
        createdAt(createdAt) {
            return createdAt;
        },
        author(author) {
            return typeof author === 'string' && author.length > 0;
        },
        description(description) {
            return description && description.length > PostsList._MIN_WORD && description.length < PostsList._MAX_WORD;
        },
        photoLink(photoLink) {
            return photoLink && typeof photoLink === 'string' && photoLink.length !== 0;
        },
        hashTags(hashTags) {
            return !!hashTags.every(item => item.length <= PostsList._MAX_TAGS);
        },
        likes(likes) {
            return likes.length === 0;
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
        return Object.keys(photoPost).every((field) => {
            if (!Object.keys(PostsList._validateHelper).includes(field)) {
                return false;
            }
            return PostsList._validateHelper[field](photoPost[field]);
        });
    }
}

const ptr = [
    // just to test
    {
        id: '1',
        description: 'Thank you too so much!!!!',
        createdAt: new Date('02.02.2012'),
        author: 'undefined',
        photoLink: 'http://thank',
        hashTags: [],
        likes: ['shura', 'blue'],
    },

    {
        id: '2',
        description: 'It was really awesome',
        createdAt: new Date('02.02.2012'),
        author: 'Kirill Body',
        photoLink: 'http://sea',
        hashTags: [],
        likes: [],
    },

    {
        id: '3',
        description: 'Coffee, laptop and paper',
        createdAt: new Date(),
        author: 'Irina Dimm',
        photoLink: 'http://work',
        hashTags: ['auto'],
        likes: [],
    },

    {
        id: '4',
        description: 'Breakfast should be taisty! ',
        createdAt: new Date(),
        author: 'Irina Dimm',
        photoLink: 'http://break',
        hashTags: [],
        likes: [],
    },

    {
        id: '5',
        description: 'Such beautiful and cool ',
        createdAt: new Date(),
        author: 'Jhon Siny',
        photoLink: 'http://stars',
        hashTags: [],
        likes: [],
    },

    {
        id: '6',
        description: 'Classic style is always stylish',
        createdAt: new Date(),
        author: 'Pent Pen',
        photoLink: 'http://book',
        hashTags: [],
        likes: [],
    },

    {
        id: '7',
        description: 'Aloha fineds! Have a nice trip ',
        createdAt: new Date(),
        author: 'Travel Master',
        photoLink: 'http://trip',
        hashTags: [],
        likes: [],
    },

    {
        id: '8',
        description: 'Such beautiful and cool ',
        createdAt: new Date(),
        author: 'Jhon Siny',
        photoLink: 'http://stars',
        hashTags: [],
        likes: [],
    },

    {
        id: '9',
        description: 'Road and busy people',
        createdAt: new Date(),
        author: 'Don Hot',
        photoLink: 'http://road',
        hashTags: [],
        likes: [],
    },
    {
        id: '10',
        description: 'Go with me and be my',
        createdAt: new Date(),
        author: 'Lara Blue',
        photoLink: 'http://blue',
        hashTags: [],
        likes: [],
    },
    {
        id: '11',
        description: 'Be who you are',
        createdAt: new Date(),
        author: 'Miracle',
        photoLink: 'http://you',
        hashTags: [],
        likes: [],
    },
    {
        id: '12',
        description: 'Love always need attentions',
        createdAt: new Date(),
        author: 'Mira Vox',
        photoLink: 'http://love',
        hashTags: [],
        likes: [],
    },
    {
        id: '13',
        description: '13 - isn\'t bad number, people are bad',
        createdAt: new Date(),
        author: 'Too Smart Boy',
        photoLink: 'http://13',
        hashTags: [],
        likes: [],
    },
    {
        id: '14',
        description: 'True friends always near',
        createdAt: new Date(),
        author: 'Miracle',
        photoLink: 'http://friends',
        hashTags: [],
        likes: [],
    },
    {
        id: '15',
        description: 'My body - my rules',
        createdAt: new Date(),
        author: 'Lara Blue',
        photoLink: 'http://body',
        hashTags: [],
        likes: [],
    },
    {
        id: '16',
        description: 'Share your emotions with family more',
        createdAt: new Date(),
        author: 'Andrei Gaevskiy',
        photoLink: 'http://family',
        hashTags: [],
        likes: [],
    },
    {
        id: '17',
        description: 'Plain, train, car or bike?',
        createdAt: new Date(),
        author: 'Dima Ternov',
        photoLink: 'http://vehicle',
        hashTags: [],
        likes: [],
    },
    {
        id: '18',
        description: 'Green is my favorite colour',
        createdAt: new Date(),
        author: 'Nadya Diamond',
        photoLink: 'http://green',
        hashTags: [],
        likes: [],
    },
    {
        id: '19',
        description: 'Spend time useful!',
        createdAt: new Date(),
        author: 'Max Full',
        photoLink: 'http://time',
        hashTags: [],
        likes: [],
    },
    {
        id: '20',
        description: 'You are in my heart',
        createdAt: new Date(),
        author: 'Lara Blue',
        photoLink: 'http://heart',
        hashTags: [],
        likes: [],
    },


];


const Page = new PostsList(ptr);
const ptr2 = [
{
        id: '23',
        description: 'OPPPS',
        createdAt: new Date(),
        author: 'undefined',
        photoLink: 'http://thank',
        hashTags: [],
        likes: ['shura', 'blue'],
    },

    {
        id: '24',
        description: 'Nice nice nice nice',
        createdAt: new Date(),
        author: 'My little friend',
        photoLink: 'http://',
        hashTags: [],
        likes: [],
    },
];


console.log('Let\'s test every function:');
console.log('"Page.get(\'1\');"');
console.log(Page.get('1'));
console.log('"Page.remove(\'1\');"');
console.log(Page.remove('1'));
console.log('"Page.get(\'1\');"');
console.log(Page.get('1'));
console.log('"script.add({description: "My fruty sweety pain", hashTags: ["Me", "You"], photoLink: "http"})"');
console.log(Page.add({ description: 'My fruty sweety pain', hashTags: ['Me', 'You'], photoLink: 'http' }));
console.log('"Page.edit(\'3\', {hashTags: [\'wow\',\'cool\'], description: \'Now I can do almost all\'})"');
console.log(Page.edit('3', { hashTags: ['wow', 'cool'], description: 'Now I can do almost all' }));
console.log('"Page.getPage(0,10,{author: \'a\', hashTags: \'o\'})"');
console.log(Page.getPage(0, 10, { author: 'a', hashTags: 'o' }));
console.log(Page.getPage());
console.log('"toDate: "01.01.2018""');
console.log(Page.getPage(0, 10, { toDate: '01.01.2018' }));
console.log('"Page.addAll(ptr2)"');
console.log(Page.addAll(ptr2));
console.log('"PostCollection._validate({a: 0})"');
console.log(PostsList._validate({ a: 0 }));
console.log(Page.clear());
