const Global = (function () {
    const ptr = [
        // just to test
        {
            id: '1',
            description: 'Thank you too so much!!!!',
            createdAt: new Date('02.02.2017'),
            author: 'Andrei',
            photoLink: 'images/second.jpg',
            hashTags: [],
            likes: ['shura', 'blue'],
        },

        {
            id: '2',
            description: 'It was really awesome',
            createdAt: new Date('02.02.2012'),
            author: 'Andrei',
            photoLink: 'images/third.jpg',
            hashTags: [],
            likes: ['shura', 'blue'],
        },

        {
            id: '3',
            description: 'Coffee, laptop and paper',
            createdAt: new Date(),
            author: 'Andrei',
            photoLink: 'images/forth.jpg',
            hashTags: ['auto', 'moto', 'velo'],
            likes: ['Irina Dimm'],
        },

        {
            id: '4',
            description: 'Breakfast should be taisty! ',
            createdAt: new Date(),
            author: 'Irina Dimm',
            photoLink: 'images/81367782.jpg',
            hashTags: [],
            likes: [],
        },

        {
            id: '5',
            description: 'Such beautiful and cool ',
            createdAt: new Date(),
            author: 'Andrei',
            photoLink: 'images/fifth.jpg',
            hashTags: [],
            likes: [],
        },

        {
            id: '6',
            description: 'Classic style is always stylish',
            createdAt: new Date(),
            author: 'Pent Pen',
            photoLink: 'images/sixth.jpg',
            hashTags: [],
            likes: [],
        },

        {
            id: '7',
            description: 'Aloha fineds! Have a nice trip ',
            createdAt: new Date(),
            author: 'Andrei',
            photoLink: 'images/seventh.jpg',
            hashTags: [],
            likes: [],
        },

        {
            id: '8',
            description: 'Such beautiful and cool ',
            createdAt: new Date(),
            author: 'Jhon Siny',
            photoLink: 'images/eith.jpeg',
            hashTags: [],
            likes: [],
        },

        {
            id: '9',
            description: 'Road and busy people',
            createdAt: new Date(),
            author: 'Don Hot',
            photoLink: 'images/20.jpg',
            hashTags: [],
            likes: [],
        },
        {
            id: '10',
            description: 'Go with me and be my',
            createdAt: new Date(),
            author: 'Lara Blue',
            photoLink: 'images/19.jpg',
            hashTags: [],
            likes: [],
        },
        {
            id: '11',
            description: 'Be who you are',
            createdAt: new Date(),
            author: 'Miracle',
            photoLink: 'images/18.jpg',
            hashTags: [],
            likes: [],
        },
        {
            id: '12',
            description: 'Love always need attentions',
            createdAt: new Date(),
            author: 'Andrei',
            photoLink: 'images/20.jpg',
            hashTags: [],
            likes: [],
        },
        {
            id: '13',
            description: '13 - isn\'t bad number, people are bad',
            createdAt: new Date(),
            author: 'Too Smart Boy',
            photoLink: 'images/16.jpg',
            hashTags: [],
            likes: [],
        },
        {
            id: '14',
            description: 'True friends always near',
            createdAt: new Date(),
            author: 'Miracle',
            photoLink: 'images/15.jpg',
            hashTags: [],
            likes: [],
        },
        {
            id: '15',
            description: 'My body - my rules',
            createdAt: new Date(),
            author: 'Lara Blue',
            photoLink: 'images/14.jpg',
            hashTags: [],
            likes: [],
        },
        {
            id: '16',
            description: 'Share your emotions with family more',
            createdAt: new Date(),
            author: 'Andrei Gaevskiy',
            photoLink: 'images/13.jpg',
            hashTags: [],
            likes: [],
        },
        {
            id: '17',
            description: 'Plain, train, car or bike?',
            createdAt: new Date(),
            author: 'Dima Ternov',
            photoLink: 'images/forth.jpg',
            hashTags: [],
            likes: [],
        },
        {
            id: '18',
            description: 'Green is my favorite colour',
            createdAt: new Date(),
            author: 'Nadya Diamond',
            photoLink: 'images/eleventh.jpg',
            hashTags: [],
            likes: [],
        },
        {
            id: '19',
            description: 'Spend time useful!',
            createdAt: new Date(),
            author: 'Max Full',
            photoLink: 'images/nienth.jpg',
            hashTags: [],
            likes: [],
        },
        {
            id: '20',
            description: 'You are in my heart',
            createdAt: new Date(),
            author: 'Lara Blue',
            photoLink: 'images/21.jpg',
            hashTags: [],
            likes: [],
        },


    ];

    const us = {
        name: 'Irina Dimm',
    };
    const postsList = new PostsList(ptr, us);
    const view = new View(ptr, us);

    function showMorePosts() {
        view.showMorePosts();
    }

    function filterPosts(filterConfig) {
       const filteredPosts = postsList.getPage(0, postsList._photoPosts.length, filterConfig);
       view.setNewPostsList(filteredPosts);
    }


    function addPhotoPost(post) {
        if (postsList.add(post)) {
            view.showPosts(postsList.getPage());
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
        if (postsList.likePost(id)) {
            view.likePost(id);
        } else {
            view.unlikePost(id);
        }
    }

    function editPost(id, filterConfig) {
        if (!postsList.edit(id, filterConfig)) {
            return false;
        }
        view.showPosts(postsList.getPage());
        return true;
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
    };
}());


console.log('Let\'s test every function:');
console.log('To show only ten (if there are) posts:');
console.log('"Global.showFirstPosts()"');
console.log(Global.showFirstPosts());
console.log('To remove a post (you can do if a post is shown)');
console.log('"Global.remove(\'3\');"');
console.log(Global.remove('3'));
console.log('To add new post (happen from another page, so can show first tens)');
console.log('"Global.addPhotoPost({description: "My fruty sweety pain", hashTags: ["Me", "You"], photoLink: "images/first.jpg"})"');
console.log(Global.addPhotoPost({ description: 'My fruty sweety pain', hashTags: ['Me', 'You'], photoLink: 'images/first.jpg' }));
console.log('To edit a post ( again happen from another page, so can show first tens)');
console.log('"Global.editPost(\'4\', {hashTags: [\'wow\',\'cool\'], description: \'Now I can do almost all\'})"');
console.log(Global.editPost('4', { hashTags: ['wow', 'cool'], description: 'Now I can do almost all' }));
console.log('To show ten more posts:');
console.log('"Global.showMorePosts()"');
console.log(Global.showMorePosts());
console.log('To filter posts :');
console.log('"Global.filterPosts({toDate: "01.01.2018)"}');
console.log(Global.filterPosts({ toDate: '01.01.2020' }));
console.log('"Global.addAll(ptr2)"');
console.log('if filtered posts more then 10, you can showMore:)');
console.log('To exit from filter you need empty filterConfig or showFirstPosts:');
console.log('"Global.filterPosts({})');
console.log(Global.filterPosts());
console.log('To like/unlike a post');
console.log('"Global.likePost("4")"');
console.log(Global.likePost('4'));
console.log('To show/hide filter');
console.log('"Global.showFilter"');
console.log(Global.showFilter());
