var script = (function () {

    var _username = 'Back Time';
    var MIN_DSCR = 10;
    var MAX_DSCR = 200;

    function  sortA(a, b) {
       return  b.createdAt - a.createdAt;
    }
    
    var photoPosts = [
        //just to test
        {
            id: '1',
            description: 'Thank you too so much!!!!',
            createdAt: new Date('02.02.2012'),
            author: 'undefined',
            photoLink: 'http://thank',
            hashTags: [],
            likes: ['shura', 'blue']
        },

        {
            id: '2',
            description: 'It was really awesome',
            createdAt: new Date('02.02.2012'),
            author: 'Kirill Body',
            photoLink: 'http://sea',
            hashTags: [],
            likes: []
        },

        {
            id: '3',
            description: 'Coffee, laptop and paper',
            createdAt: new Date(),
            author: 'Irina Dimm',
            photoLink: 'http://work',
            hashTags: ['auto'],
            likes: []
        },

        {
            id: '4',
            description: 'Breakfast should be taisty! ',
            createdAt: new Date(),
            author: 'Irina Dimm',
            photoLink: 'http://break',
            hashTags: [],
            likes: []
        },

        {
            id: '5',
            description: 'Such beautiful and cool ',
            createdAt: new Date(),
            author: 'Jhon Siny',
            photoLink: 'http://stars',
            hashTags: [],
            likes: []
        },

        {
            id: '6',
            description: 'Classic style is always stylish',
            createdAt: new Date(),
            author: 'Pent Pen',
            photoLink: 'http://book',
            hashTags: [],
            likes: []
        },

        {
            id: '7',
            description: 'Aloha fineds! Have a nice trip ',
            createdAt: new Date(),
            author: 'Travel Master',
            photoLink: 'http://trip',
            hashTags: [],
            likes: []
        },

        {
            id: '8',
            description: 'Such beautiful and cool ',
            createdAt: new Date(),
            author: 'Jhon Siny',
            photoLink: 'http://stars',
            hashTags: [],
            likes: []
        },

        {
            id: '9',
            description: 'Road and busy people',
            createdAt: new Date(),
            author: 'Don Hot',
            photoLink: 'http://road',
            hashTags: [],
            likes: []
        },
        {
            id: '10',
            description: 'Go with me and be my',
            createdAt: new Date(),
            author: 'Lara Blue',
            photoLink: 'http://blue',
            hashTags: [],
            likes: []
        },
        {
            id: '11',
            description: 'Be who you are',
            createdAt: new Date(),
            author: 'Miracle',
            photoLink: 'http://you',
            hashTags: [],
            likes: []
        },
        {
            id: '12',
            description: 'Love always need attentions',
            createdAt: new Date(),
            author: 'Mira Vox',
            photoLink: 'http://love',
            hashTags: [],
            likes: []
        },
        {
            id: '13',
            description: '13 - isn\'t bad number, people are bad',
            createdAt: new Date(),
            author: 'Too Smart Boy',
            photoLink: 'http://13',
            hashTags: [],
            likes: []
        },
        {
            id: '14',
            description: 'True friends always near',
            createdAt: new Date(),
            author: 'Miracle',
            photoLink: 'http://friends',
            hashTags: [],
            likes: []
        },
        {
            id: '15',
            description: 'My body - my rules',
            createdAt: new Date(),
            author: 'Lara Blue',
            photoLink: 'http://body',
            hashTags: [],
            likes: []
        },
        {
            id: '16',
            description: 'Share your emotions with family more',
            createdAt: new Date(),
            author: 'Andrei Gaevskiy',
            photoLink: 'http://family',
            hashTags: [],
            likes: []
        },
        {
            id: '17',
            description: 'Plain, train, car or bike?',
            createdAt: new Date(),
            author: 'Dima Ternov',
            photoLink: 'http://vehicle',
            hashTags: [],
            likes: []
        },
        {
            id: '18',
            description: 'Green is my favorite colour',
            createdAt: new Date(),
            author: 'Nadya Diamond',
            photoLink: 'http://green',
            hashTags: [],
            likes: []
        },
        {
            id: '19',
            description: 'Spend time useful!',
            createdAt: new Date(),
            author: 'Max Full',
            photoLink: 'http://time',
            hashTags: [],
            likes: []
        },
        {
            id: '20',
            description: 'You are in my heart',
            createdAt: new Date(),
            author: 'Lara Blue',
            photoLink: 'http://heart',
            hashTags: [],
            likes: []
        },


    ];

    function hasTag(hashTags, tag) {
        return !!hashTags.find(hashTag => hashTag.includes(tag))
    }



    function getPhotoPost(id){
        return photoPosts.find(post => post.id === id);
    }

    function addPhotoPost (post) {

        var newPost = {
            id: new Date().getMilliseconds().toString(),
            description: post.description,
            createdAt: new Date(),
            author: _username,
            photoLink: post.photoLink,
            hashTags: (post.hashTags && post.hashTags.map(tag => tag.toLowerCase().trim()) )|| [],
            likes: []
        }

        if (validatePhotoPost(newPost)) {
            photoPosts.push(newPost);
            return true;
        }
        return false;
    }

    var validateHelper = {
        id: function(id){
         return typeof id === 'string' && id.length > 0;
        },
        createdAt: function(createdAt){
         return  createdAt;
        },
        author: function(author){
            return typeof author === 'string' && author.length > 0;
        },
        description: function (description) {
            return description && description.length > MIN_DSCR && description.length < MAX_DSCR;
        },
        photoLink: function ( photoLink) {
           return photoLink && typeof photoLink === 'string' && photoLink.length !== 0;
        },
        hashTags: function (hashTags) {
           return !!hashTags.every(function (item) {
                return item.length <= 20;
            });
        },
        likes: function (likes) {
            return likes.length === 0;
        }
    }

    function validatePhotoPost(photoPost) {
      return  Object.keys(photoPost).every(function (field) {
           return validateHelper[field](photoPost[field]);
       });

    };

    function removePhotoPost (id) {
        var post = getPhotoPost(id);
        if (!post) {
            return false;
        }
        photoPosts.splice(photoPosts.indexOf(post), 1);
        return true;
    }

     var editHelper ={
        hashTags: function (hashTags) {
            return hashTags.map(tag => tag.toLowerCase().trim());
        },
        description: function (description) {
            return description.trim();
        },
        photoLink: function (photoLink) {
            return photoLink.trim();
        }
     }
    function editPhotoPost (id, edit) {
        var post = getPhotoPost(id);
        if (!post) {
            return false;
        }
        var editedPost = JSON.parse(JSON.stringify(post));
        Object.keys(edit).forEach(function (field) {
            editedPost[field] = editHelper[field](edit[field]);
            }
        );

        if (!validatePhotoPost(editedPost)) {
            return false;
        }
        for (field in edit) {
            post[field] = JSON.parse(JSON.stringify(editedPost[field]));
        }
        return true;
    }

    var filterHelper = {
        author: function (posts, author) {
            return posts.filter( function (post) {
                return post.author.toLowerCase().includes(author.toLowerCase().trim()); });
        },
        fromDate:  function (posts, fromDate) {
            fromDate = new Date(fromDate);
            return posts.filter( function (post) {
                return post.createdAt >= fromDate; });
        },
        toDate: function (posts, toDate) {
            toDate = new Date(fromDate);
            return posts.filter( function (post) {
                return post.createdAt <= toDate; });
        },
        hashTags: function (posts, hashTags) {
            var tags = hashTags.toLowerCase().trim().split(/[\s,]+/);
            return posts.filter( function (post) {
                return tags.every(function (tag) {
                    return hasTag(post.hashTags,tag)
                })
            });
        }
    }

   function getPhotoPosts(skip = 0, top =10, filterConfig = undefined) {
        var filteredPosts = photoPosts.slice();
        if(filterConfig) {
            Object.keys(filterConfig).forEach(function (field) {
                filteredPosts = filterHelper[field](filteredPosts, filterConfig[field])
            });
        }
        filteredPosts = filteredPosts.slice(skip, skip + top);
        return filteredPosts.sort(sortA);
    }

    return {
        getPhotoPost: getPhotoPost,
        validatePhotoPost: validatePhotoPost,
        addPhotoPost: addPhotoPost,
        removePhotoPost: removePhotoPost,
        editPhotoPost: editPhotoPost,
        getPhotoPosts: getPhotoPosts,
}
}());


console.log('Let\'s test every function:');
console.log('\"script.getPhotoPost(\'1\');\"');
console.log(script.getPhotoPost('1'));
console.log('\"script.removePhotoPost(\'1\');\"');
console.log(script.removePhotoPost('1'));
console.log('\"script.getPhotoPost(\'1\');\"');
console.log(script.getPhotoPost('1'));
console.log('\"script.addPhotoPost({description: "My fruty sweety pain", hashTags: ["Me", "You"], photoLink: "http"})\"');
console.log(script.addPhotoPost({description: "My fruty sweety pain", hashTags: ["Me", "You"], photoLink: "http"}));
console.log('\"script.editPhotoPost(\'3\', {hashTags: [\'wow\',\'cool\'], description: \'Now I can do almost all\'})\"')
console.log(script.editPhotoPost('3', {hashTags: ['wow','cool'], description: 'Now I can do almost all'}));
console.log('\"script.getPhotoPosts(0,10,{author: \'a\', hashTags: \'o\'})\"');
console.log(script.getPhotoPosts(0,10,{author: 'a', hashTags: 'o'}))