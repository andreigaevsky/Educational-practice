;var script = (function () {

    function  sortA(a, b) {
       return  b.createdAt - a.createdAt;
    }
    var photoPosts = [

        {
            id: '1',
            description: 'Thank you too so much!!!!',
            createdAt: new Date(),
            author: 'undefined',
            photoLink: 'http://thank',
            hashTags: [],
            likes: ['shura', 'blue']
        },

        {
            id: '2',
            description: 'It was really awesome',
            createdAt: new Date(),
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
            description: 'You are in mu heart',
            createdAt: new Date(),
            author: 'Lara Blue',
            photoLink: 'http://heart',
            hashTags: [],
            likes: []
        },


    ];

    function hasTag(hashTags, tag) {
        if (hashTags.find(hashTag => hashTag.toLowerCase().trim().includes(tag.trim().toLowerCase())) !==
        undefined
    )
        {
            return true;
        }
        return false;
    }

    Date.prototype.withoutTime = function () {
        var d =  new Date(this);
        d.setHours(0,0,0,0);
        return d;
    }


    return {
        getPhotoPost: function (id) {
            return photoPosts.find(post => post.id === id
        )
            ;
        },


        addPhotoPost: function (post) {
            if (validatePhotoPost(post)) {
                post.createdAt = new Date(post.createdAt);
                photoPosts.push(post);
                return true;
            }
            return false;
        },

        removePhotoPost: function (id) {
            var post = getPhotoPost(id);
            if (post === undefined) {
                return false;
            }
            console.log(photoPosts.splice(photoPosts.indexOf(post), 1));
            return true;
        },

        validatePhotoPost: function (photoPost) {
            if (photoPost !== undefined) {

                if (!(typeof photoPost.id === 'string')) {
                    return false;
                }
                if (photoPosts.find(post => post.id === undefined))
                {
                    return false;
                }


                if (typeof (photoPost.description) == 'string') {
                    if (photoPost.description.length < 10 || photoPost.description.length > 200) return false;
                } else {
                    return false;
                }


                if (photoPost.createdAt === null || photoPost.createdAt === undefined || new Date(photoPost.createdAt) == 'Invalid Date'
                ) {
                    return false;
                }


                if (typeof photoPost.author != 'string' || photoPost.author.length == 0) {
                    return false;
                }


                if (typeof photoPost.photoLink != 'string' || photoPost.photoLink.length == 0) {
                    return false;
                }


                if (Array.isArray(photoPost.hashTags)) {
                    if (!photoPost.hashTags.includes(null) && !photoPost.hashTags.includes(undefined) && !photoPost.hashTags.includes('')) {
                        var tags = photoPost.hashTags.find(function (item) {
                            // find
                            return item.length > 20;
                        });
                        if (tags !== undefined) return false;
                    } else {
                        return false;
                    }
                }


                if (Array.isArray(photoPost.likes)) {
                    if (photoPost.likes.includes(null) || photoPost.likes.includes(undefined) || photoPost.likes.includes('')) {
                        return false;
                    }
                }
            } else {
                return false;
            }

            return true;

        },

        editPhotoPost: function (id, edit) {
            var post = getPhotoPost(id);
            if (post === undefined) {
                return false;
            }
            var editedPost = JSON.parse(JSON.stringify(post));
            for (field in edit) {
                switch (field) {
                    case 'author':
                    case 'createdAt':
                    case 'likes':
                    case 'id': {
                        console.log('You can\'t edit the field <{}>'.replace('{}', field));
                        return false;
                    }
                    case 'description':
                    case 'hashTags':
                    //проверить, можно ли так присвоить массив тегов
                    case 'photoLink': {
                        editedPost[field] = edit[field];
                        break;
                    }
                    default: {
                        console.log("The field \"" + field + "\" doesn't exist!");
                        return false;
                    }
                }
            }

            if (validatePhotoPost(editedPost)) {
                for (field in edit) {
                    post[field] = JSON.parse(JSON.stringify(editedPost[field]));
                }
                return true;
            } else {
                return false;
            }
        },


        getPhotoPosts: function (skip = 0, top =10, filterConfig) {
            var filteredPosts = photoPosts.slice();
            if (filterConfig !== null && filterConfig !== undefined && typeof filterConfig === 'object') {
                for (field in filterConfig) {
                    switch (field) {
                        case 'fromDate':
                            if (filterConfig.fromDate !== null && filterConfig.fromDate !== undefined && filterConfig.fromDate.trim() !== '') {
                                if (new Date(filterConfig.fromDate) !== 'Invalid Date') {
                                    fromDate = new Date(filterConfig.fromDate);
                                    filteredPosts = filteredPosts.filter(function (post) {
                                        return post.createdAt > fromDate;
                                    });
                                }
                            }
                            break;
                        case 'toDate':
                            if (filterConfig.toDate !== null && filterConfig.toDate !== undefined && filterConfig.toDate.trim() !== '') {
                                if (new Date(filterConfig.fromDate) !== 'Invalid Date') {
                                    toDate = new Date(filterConfig.toDate);
                                    filteredPosts = filteredPosts.filter(function (post) {
                                        return post.createdAt.withoutTime() < toDate.withoutTime();
                                    });
                                }
                            }
                            break;
                        case 'author':
                            if (filterConfig.author !== null && filterConfig.author !== undefined && filterConfig.author.trim() !== '') {

                                filteredPosts = filteredPosts.filter(function (post) {
                                    return post.author.trim().toLowerCase().includes(filterConfig['author'].toLowerCase().trim());
                                });
                            }
                            break;
                        case 'hashTags': {
                            if (filterConfig.hashTags !== null && filterConfig.hashTags !== undefined && filterConfig.hashTags.trim() !== '') {
                                var tags = filterConfig['hashTags'].split(/[\s,]+/);
                                filteredPosts = filteredPosts.filter(function (post) {
                                    for (index = 0; index < tags.length; index++) {
                                        if (!hasTag(post.hashTags, tags[index])) {
                                            return false;
                                        }
                                    }
                                    return true;
                                });
                            }
                            break;
                        }
                        default: {
                            console.log("The field \"" + field + "\" doesn't exist!");
                            return false;
                        }
                    }
                }
            }
            filteredPosts = filteredPosts.slice(skip, skip + top);
            return filteredPosts.sort(sortA);
        }

}



}());