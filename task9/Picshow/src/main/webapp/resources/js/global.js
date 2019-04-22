const Global = (function () {
    function fillLocalStorage() {
        const ptr = [
            // just to test
            {
                id: '1',
                description: 'Thank you too so much!!!!',
                createdAt: new Date('02.02.2017'),
                author: 'Andrei',
                photoLink: 'resources/images/second.jpg',
                hashTags: [],
                likes: ['shura', 'blue'],
            },

            {
                id: '2',
                description: 'It was really awesome',
                createdAt: new Date('02.02.2012'),
                author: 'Andrei',
                photoLink: 'resources/images/third.jpg',
                hashTags: [],
                likes: ['shura', 'blue'],
            },

            {
                id: '3',
                description: 'Coffee, laptop and paper',
                createdAt: new Date(),
                author: 'Andrei',
                photoLink: 'resources/images/forth.jpg',
                hashTags: ['auto', 'moto', 'velo'],
                likes: ['Irina Dimm'],
            },

            {
                id: '4',
                description: 'Breakfast should be taisty! ',
                createdAt: new Date(),
                author: 'Irina Dimm',
                photoLink: 'resources/images/81367782.jpg',
                hashTags: [],
                likes: [],
            },

            {
                id: '5',
                description: 'Such beautiful and cool ',
                createdAt: new Date(),
                author: 'Andrei',
                photoLink: 'resources/images/fifth.jpg',
                hashTags: [],
                likes: [],
            },

            {
                id: '6',
                description: 'Classic style is always stylish',
                createdAt: new Date(),
                author: 'Pent Pen',
                photoLink: 'resources/images/sixth.jpg',
                hashTags: [],
                likes: [],
            },

            {
                id: '7',
                description: 'Aloha fineds! Have a nice trip ',
                createdAt: new Date(),
                author: 'Andrei',
                photoLink: 'resources/images/seventh.jpg',
                hashTags: [],
                likes: [],
            },

            {
                id: '8',
                description: 'Such beautiful and cool ',
                createdAt: new Date(),
                author: 'Jhon Siny',
                photoLink: 'resources/images/eith.jpeg',
                hashTags: [],
                likes: [],
            },

            {
                id: '9',
                description: 'Road and busy people',
                createdAt: new Date(),
                author: 'Don Hot',
                photoLink: 'resources/images/20.jpg',
                hashTags: [],
                likes: [],
            },
            {
                id: '10',
                description: 'Go with me and be my',
                createdAt: new Date(),
                author: 'Lara Blue',
                photoLink: 'resources/images/19.jpg',
                hashTags: [],
                likes: [],
            },
            {
                id: '11',
                description: 'Be who you are',
                createdAt: new Date(),
                author: 'Miracle',
                photoLink: 'resources/images/18.jpg',
                hashTags: [],
                likes: [],
            },
            {
                id: '12',
                description: 'Love always need attentions',
                createdAt: new Date(),
                author: 'Andrei',
                photoLink: 'resources/images/20.jpg',
                hashTags: [],
                likes: [],
            },
            {
                id: '13',
                description: '13 - isn\'t bad number, people are bad',
                createdAt: new Date(),
                author: 'Too Smart Boy',
                photoLink: 'resources/images/16.jpg',
                hashTags: [],
                likes: [],
            },
            {
                id: '14',
                description: 'True friends always near',
                createdAt: new Date(),
                author: 'Miracle',
                photoLink: 'resources/images/15.jpg',
                hashTags: [],
                likes: [],
            },
            {
                id: '15',
                description: 'My body - my rules',
                createdAt: new Date(),
                author: 'Lara Blue',
                photoLink: 'resources/images/14.jpg',
                hashTags: [],
                likes: [],
            },
            {
                id: '16',
                description: 'Share your emotions with family more',
                createdAt: new Date(),
                author: 'Andrei Gaevskiy',
                photoLink: 'resources/images/13.jpg',
                hashTags: [],
                likes: [],
            },
            {
                id: '17',
                description: 'Plain, train, car or bike?',
                createdAt: new Date(),
                author: 'Dima Ternov',
                photoLink: 'resources/images/forth.jpg',
                hashTags: [],
                likes: [],
            },
            {
                id: '18',
                description: 'Green is my favorite colour',
                createdAt: new Date(),
                author: 'Nadya Diamond',
                photoLink: 'resources/images/eleventh.jpg',
                hashTags: [],
                likes: [],
            },
            {
                id: '19',
                description: 'Spend time useful!',
                createdAt: new Date(),
                author: 'Max Full',
                photoLink: 'resources/images/nienth.jpg',
                hashTags: [],
                likes: [],
            },
            {
                id: '20',
                description: 'You are in my heart',
                createdAt: new Date(),
                author: 'Lara Blue',
                photoLink: 'resources/images/21.jpg',
                hashTags: [],
                likes: [],
            },


        ];
        localStorage.setItem('posts', JSON.stringify(ptr));
    }


    function restorePosts() {
        return JSON.parse(localStorage.getItem('posts'));
    }

    function restoreUser() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            return undefined;
        }
        return user;
    }

    const ptr = restorePosts();
    let _user = restoreUser();
    let postsList = new PostsList(ptr, _user);
    let view = new View(ptr, _user);

    function showMorePosts() {
        view.showMorePosts();
    }

    function logOut() {
        localStorage.removeItem('user');
        postsList = new PostsList(ptr);
        view = new View(ptr);
        view.logout();
    }

    function logIn() {
        view.login();
    }
    function back() {
        view.back();
        view.updateHeader();
    }

    function filterPosts(filterConfig) {
       const filteredPosts = postsList.getPage(0, postsList._photoPosts.length, filterConfig);
       view.setNewPostsList(filteredPosts);
    }

    function findAllIncludes(param) {
        let filteredPosts = postsList.getPage(0, postsList._photoPosts.length, {author: param});
        let nextPosts = postsList.getPage(0, postsList._photoPosts.length, {hashTags: param});
        filteredPosts = filteredPosts.concat(nextPosts.filter(i => filteredPosts.indexOf(i) === -1));
        nextPosts = postsList.getByDescription(param);
        filteredPosts = filteredPosts.concat(nextPosts.filter(i => filteredPosts.indexOf(i) === -1));
        view.setNewPostsList(filteredPosts);
    }

    function addPhotoPost(post) {
        if (postsList.add(post)) {
            view.setNewPostsList(postsList.getAllPosts());
            return true;
        }
        return false;
    }

    function remove(id) {
        if (!postsList.remove(id)) {
            return false;
        }
        return view.remove(id);
    }

    function showFilter() {
        ViewHeader.showFilter();
    }

    function showPosts() {
        view.showPosts(postsList.getPage());
    }

    function likeThis(id) {
        postsList.likePost(id);
        view.toggleLike(id, postsList.get(id).likes.length);
    }

    function loginUser(user) {
        _user = user;
        localStorage.setItem('user', JSON.stringify(_user));
        postsList = new PostsList(ptr, user);
        view = new View(ptr, user);
        view.loginUser();
    }

    function getCurUser() {
        return _user;
    }

    function editPost(id, filterConfig) {
        if (!postsList.edit(id, filterConfig)) {
            return false;
        }
        view.showPosts(postsList.getPage());
        return true;
    }
    function newPost() {
        view.createNewPost();
    }

    function setEditPageData(id) {
        view.setEditPageData(id);
    }


    return {
        addPhotoPost,
        showFilter,
        showFirstPosts: showPosts,
        remove,
        showMorePosts,
        filterPosts,
        editPost,
        likePost: likeThis,
        logOut,
        logIn,
        back,
        setEditPageData,
        loginUser,
        newPost,
        findAllIncludes,
    };
}());
