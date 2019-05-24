
class View {
    static EDIT_MASC = 'ED';

    static HIDDEN_CLASS = 'hidden-block';

    static LOGIN_FORM_CLASS = '.login-form';

    static COLOR_MAIN_BLUE = '#008dd4';

    static COLOR_MAIN_GRAY = '#aaaaaa';

    static TEMPLATE_POST_ID = 'post-template';

    static TEMPLATE_POST_TAG_ID = 'post-tag';

    static BTN_LOGOUT_ID = 'menu-logout-btn';

    static BTN_LOGIN_ID = 'menu-login-btn';

    static BTN_BACK_ID = 'menu-back-btn';

    static H2_USERNAME = 'head-user';

    static BTN_POST_CREATE_ID = 'post-create-btn';

    static NAME_CLASSIC_BTN_CLASS = 'classic-btn';

    static WALL_ID = 'posts-wall';

    static DIV_MORE_PHOTO_CLASS = 'more-photo';

    static IMG_EDIT_PHOTO = 'edit-photo-img';

    static EDIT_CONTAINER_CLASS = '.edit-container';

    static TAG_TEXT_P_CLASS = '.tag-text';

    static BTN_LIKE_PH_CLASS = '.like-ph-btn';

    static INPUT_EDIT_DESCRIPTION_ID = 'edit-description-input';

    static INPUT_EDIT_TAG_ID = 'tag-input';

    static BTN_DELETE_POST_CLASS = '.post-delete-btn';

    static BTN_EDIT_POST_CLASS = '.post-edit-btn';

    static DIV_MAIN_PAGE_ID = 'main-page';

    static DIV_LOGIN_PAGE_ID = 'login-page';

    static DIV_EDIT_PAGE_ID = 'edit-page';

    static UL_EDIT_TAGS_ID = 'main-tags';

    static TEMPLATE_EDIT_TAG = 'edit-tag-template';

    static EDIT_ERROR_TEXT_P_ID = 'edit-error-text';

    static DIV_EDIT_PHOTO_CLASS = '.drag-drop';

    static PATH_PH_LIKED = 'resources/images/liked.png';

    static PATH_PH_LIKE = 'resources/images/like.png';

    static BTN_LIKE_CLASS = '.like-btn';

    static EDIT_USER_H_ID = 'edit-name';

    static EDIT_TIME_P_ID = 'edit-time';

    static POST_COUNT_LIKES_P_CLASS = '.count-likes';

    static POST_USERNAME_CLASS = '.u-name';

    static POST_DESCRIPTION_CLASS = '.post-describe';

    static POST_TIME_P_CLASS = '.post-time';

    static POST_PHOTO_CLASS = '.post-photo';

    static POST_TAGS_CLASS = '.tags';

    static EDIT_PRE_PHOTO_CLASS = '.pre-photo';

    static MIN_EMPTY_FIELD_PX = '400px';

    static _EMPTY = '';

    static FILTER_FORM_CLASS = '.filter-form-class';


    static _MAX_TAG_SYMBOLS = 20;

    constructor(postsArray, user) {
        this._user = user;
        this.TEMPLATE = document.getElementById(View.TEMPLATE_POST_ID);
        this.TAGS = document.getElementById(View.TEMPLATE_POST_TAG_ID);
        this.showPosts(postsArray);
        this.updateHeader(this._user);
        View._restoreFilterData(document.querySelector(View.FILTER_FORM_CLASS));
    }

    updateHeader() {
        const loginBtn = document.getElementById(View.BTN_LOGIN_ID);
        const logOutBtn = document.getElementById(View.BTN_LOGOUT_ID);
        const username = document.getElementById(View.H2_USERNAME);
        const addPostBtn = document.getElementById(View.BTN_POST_CREATE_ID);
        if (this._user) {
            loginBtn.className = View.HIDDEN_CLASS;
            logOutBtn.className = View.NAME_CLASSIC_BTN_CLASS;
            username.innerHTML = this._user.username;
            addPostBtn.className = View.NAME_CLASSIC_BTN_CLASS;
            addPostBtn.disabled = false;
        } else {
            loginBtn.className = View.NAME_CLASSIC_BTN_CLASS;
            logOutBtn.className = View.HIDDEN_CLASS;
            username.innerHTML = View._EMPTY;
            addPostBtn.className = View.HIDDEN_CLASS;
            addPostBtn.disabled = true;
        }
    }

    static clearLoginPage() {
        const loginForm = document.querySelector(View.LOGIN_FORM_CLASS);
        loginForm.username.value = View._EMPTY;
        loginForm.password.value = View._EMPTY;
    }

    async remove(id) {
        const node = document.getElementById(id);
        const wall = document.getElementById(View.WALL_ID);
        if (!node) {
            return false;
        }
        wall.removeChild(node);
        return true;
    }

    toggleBtnMorePosts(posts) {
        const morePostsBtn = document.getElementsByClassName(View.DIV_MORE_PHOTO_CLASS);
        if(posts && posts.length === 10) {
            morePostsBtn[0].style.display = 'block';
        }else{
            morePostsBtn[0].style.display = 'none';
        }
    }

    static buildTags(tag) {
        const template = document.getElementById(View.TEMPLATE_EDIT_TAG);
        const fragment = document.importNode(
            template.content,
            true,
        );
        const newTag = fragment.firstElementChild;
        newTag.querySelector(View.TAG_TEXT_P_CLASS).innerText = "#"+tag;
        return newTag;
    }

    static showTags(tags) {
        const tagsList = document.getElementById(View.UL_EDIT_TAGS_ID);
        const fragment = document.createDocumentFragment();
        tags.forEach((tag) => { fragment.append(View.buildTags(tag)); });
        tagsList.append(fragment);
    }

    _buildTags(hashTag, tagsTemplate) {
        const fragment = document.importNode(
            tagsTemplate.content,
            true,
        );
        const newTag = fragment.firstElementChild;
        newTag.innerText = "#"+hashTag;
        return newTag;
    }

    static removeAllTags() {
       document.getElementById(View.UL_EDIT_TAGS_ID).innerHTML = View._EMPTY;
    }

    _setUserOptions(user, newPost, post) {
        if (user) {
            if (user.username === post.author) {
                const deletePostBtn = newPost.querySelector(View.BTN_DELETE_POST_CLASS);
                const editPostBtn = newPost.querySelector(View.BTN_EDIT_POST_CLASS);
                deletePostBtn.style.display = 'block';
                deletePostBtn.disabled = false;
                editPostBtn.style.display = 'block';
                editPostBtn.disabled = false;
            }
            if (post.likes.includes(user.username)) {
                newPost.querySelector(View.BTN_LIKE_PH_CLASS).src = View.PATH_PH_LIKED;
            }
        } else {
            newPost.querySelector(View.BTN_LIKE_CLASS).disabled = true;
        }
    }

    _buildPost(post) {
        const that = this;
        const fragment = document.importNode(that.TEMPLATE.content, true);
        const newPost = fragment.firstElementChild;
        newPost.id = post.id;
        newPost.querySelector(View.POST_USERNAME_CLASS).textContent = post.author;
        newPost.querySelector(View.POST_DESCRIPTION_CLASS).textContent = post.description;
        const createdAt = new Date(post.createdAt);
        newPost.querySelector(View.POST_TIME_P_CLASS).textContent = `${createdAt.toLocaleDateString()}, 
        ${createdAt.toLocaleTimeString()}`;
        newPost.querySelector(View.POST_PHOTO_CLASS).src = post.photoLink;
        newPost.querySelector(View.POST_COUNT_LIKES_P_CLASS).textContent = post.likes.length;
        this._setUserOptions(this._user, newPost, post);
        const tags = newPost.querySelector(View.POST_TAGS_CLASS);
        post.hashTags.forEach((tag) => { tags.append(that._buildTags(tag, that.TAGS)); });
        return newPost;
    }


    _getFragment(posts) {
        const fragment = document.createDocumentFragment();
        posts.forEach((post) => { fragment.append(this._buildPost(post)); });
        return fragment;
    }

    showPosts(posts) {
        const wall = document.getElementById(View.WALL_ID);
        wall.innerHTML = View._EMPTY;
        wall.append(this._getFragment(posts));
        this.toggleBtnMorePosts(posts);
    }

    showMorePosts(posts) {
        const wall = document.getElementById(View.WALL_ID);
        wall.append(this._getFragment(posts));
        this.toggleBtnMorePosts(posts);
     }

     toggleLike(id, countLikes) {
        if (this._user && countLikes !== -1) {
            const post = document.getElementById(id);
            const likeImg = post.querySelector(View.BTN_LIKE_PH_CLASS);
            likeImg.src = likeImg.src.includes('liked')
                ? View.PATH_PH_LIKE : View.PATH_PH_LIKED;
            post.querySelector(View.POST_COUNT_LIKES_P_CLASS).innerText = countLikes;
        }
     }

     logout() {
         document.getElementById(View.BTN_LOGOUT_ID).className = View.HIDDEN_CLASS;
         document.getElementById(View.BTN_LOGIN_ID).className = View.NAME_CLASSIC_BTN_CLASS;
         document.getElementById(View.BTN_POST_CREATE_ID).className = View.HIDDEN_CLASS;
         document.getElementById(View.H2_USERNAME).innerText = View._EMPTY;
     }

     static login() {
        document.getElementById(View.DIV_MAIN_PAGE_ID).className = View.HIDDEN_CLASS;
        document.getElementById(View.DIV_LOGIN_PAGE_ID).className = View._EMPTY;
        document.getElementById(View.BTN_LOGIN_ID).className = View.HIDDEN_CLASS;
        document.getElementById(View.BTN_BACK_ID).className = View.NAME_CLASSIC_BTN_CLASS;
     }

     back() {
         document.getElementById(View.DIV_MAIN_PAGE_ID).className = View._EMPTY;
         document.getElementById(View.DIV_LOGIN_PAGE_ID).className = View.HIDDEN_CLASS;
         document.getElementById(View.DIV_EDIT_PAGE_ID).className = View.HIDDEN_CLASS;
         document.getElementById(View.BTN_BACK_ID).className = View.HIDDEN_CLASS;
     }

     loginUser() {
        document.getElementById(View.BTN_POST_CREATE_ID).className = View.NAME_CLASSIC_BTN_CLASS;
         document.getElementById(View.DIV_MAIN_PAGE_ID).className = View._EMPTY;
         document.getElementById(View.DIV_LOGIN_PAGE_ID).className = View.HIDDEN_CLASS;
         document.getElementById(View.BTN_LOGOUT_ID).className = View.NAME_CLASSIC_BTN_CLASS;
         document.getElementById(View.BTN_BACK_ID).className = View.HIDDEN_CLASS;
     }

    static showEditPage() {
         document.getElementById(View.DIV_MAIN_PAGE_ID).className = View.HIDDEN_CLASS;
         document.getElementById(View.DIV_EDIT_PAGE_ID).className = View._EMPTY;
         document.getElementById(View.BTN_LOGOUT_ID).className = View.HIDDEN_CLASS;
         document.getElementById(View.BTN_BACK_ID).className = View.NAME_CLASSIC_BTN_CLASS;
     }

     static hideEditPage() {
         document.getElementById(View.DIV_MAIN_PAGE_ID).className = View._EMPTY;
         document.getElementById(View.DIV_EDIT_PAGE_ID).className = View.HIDDEN_CLASS;
         document.getElementById(View.BTN_LOGOUT_ID).className = View.NAME_CLASSIC_BTN_CLASS;
         document.getElementById(View.BTN_BACK_ID).className = View.HIDDEN_CLASS;
     }

     createNewPost() {
        View.showEditPage();
         document.getElementById(View.EDIT_USER_H_ID).innerText = this._user.username;
         document.getElementById(View.EDIT_TIME_P_ID).innerText = `${new Date().toLocaleDateString()}, 
        ${new Date().toLocaleTimeString()}`;
     }

    setEditPageData(post) {
         document.getElementById(View.EDIT_USER_H_ID).innerText = post.author;
         const date = new Date(post.createdAt);
         document.getElementById(View.EDIT_TIME_P_ID).innerText = `${date.toLocaleDateString()}, 
        ${date.toLocaleTimeString()}`;
         document.querySelector(View.EDIT_CONTAINER_CLASS).id = View.EDIT_MASC + post.id;
         const path = post.photoLink;
         View.showTags(post.hashTags);
         View.loadPhoto(post.photoLink);
         document.getElementById(View.INPUT_EDIT_DESCRIPTION_ID).value = post.description;
     }

    static clearEditPage() {
        const drag = document.querySelector(View.DIV_EDIT_PHOTO_CLASS);
        drag.style.minHeight = View.MIN_EMPTY_FIELD_PX;
        drag.style.background = 'white';
        document.querySelector(View.EDIT_CONTAINER_CLASS).id = View._EMPTY;
        document.getElementById(View.EDIT_ERROR_TEXT_P_ID).className = View.HIDDEN_CLASS;
        document.getElementById(View.EDIT_USER_H_ID).innerText = View._EMPTY;
        document.getElementById(View.EDIT_TIME_P_ID).innerText = View._EMPTY;
        document.getElementById(View.IMG_EDIT_PHOTO).src = View._EMPTY;
        document.getElementById(View.INPUT_EDIT_DESCRIPTION_ID).value = View._EMPTY;
        document.getElementById(View.INPUT_EDIT_TAG_ID).value = View._EMPTY;
        document.getElementById(View.UL_EDIT_TAGS_ID).innerHTML = View._EMPTY;
    }

    static checkTags(allTags) {
        const tags = [];
        let isGood = true;
        allTags.forEach((tag) => {
            tags.push(tag.innerText);
            if (tag.innerText.length > View._MAX_TAG_SYMBOLS) {
                tag.parentElement.parentElement.style.background = 'red';
                isGood = false;
            }
        });
        if (!isGood) {
            return false;
        }
        return tags;
    }

    static loadPhoto(path) {
        const photo = document.getElementById(View.IMG_EDIT_PHOTO);
        const drop = document.querySelector(View.DIV_EDIT_PHOTO_CLASS);
        drop.style.background = 'transparent';
        drop.style.minHeight = '1px';
        photo.className = View.EDIT_PRE_PHOTO_CLASS.replace('.', View._EMPTY);
        photo.src = path

    }

    static showEditPageErrorText() {
        document.getElementById(View.EDIT_ERROR_TEXT_P_ID).className = View._EMPTY;
    }

    static clearStorageFilter(){
        localStorage.removeItem('filterForm')
    }

    static clearFilter(filterForm) {
            filterForm.author.value = View._EMPTY;
            filterForm.fromDate.value = View._EMPTY;
            filterForm.toDate.value = View._EMPTY;
            filterForm.hashTags.value = View._EMPTY;
            Global.showFirstPosts();
            View.clearStorageFilter()
    }

     static _restoreFilterData(filterForm){
        const data = JSON.parse(localStorage.getItem('filterForm'));
        if(!data || !Object.values(data).some(field => field.length > 0)) {
            return;
        }
        filterForm.author.value = data.author;
        filterForm.fromDate.value = data.fromDate;
        filterForm.toDate.value = data.toDate;
        filterForm.hashTags.value = data.hashTags;
        ViewHeader.showFilter();
    }
}

class ViewHeader {
    static FILTER_ID = 'filter-panel';

    static BTN_HIDE_FILTER_ID = 'toggle-filter-btn';

    static showFilter() {
        const filterPanel = document.getElementById(ViewHeader.FILTER_ID);
        const btn = document.getElementById(ViewHeader.BTN_HIDE_FILTER_ID);
        if (filterPanel.className === View.HIDDEN_CLASS) {
            filterPanel.className = ViewHeader.FILTER_ID;
            btn.style.background = View.COLOR_MAIN_GRAY;
        } else {
            filterPanel.className = View.HIDDEN_CLASS;
            btn.style.background = View.COLOR_MAIN_BLUE;
        }
    }
}
