(function () {
const _EDIT_RIGHT_FIELDS_ID = 'edit-right-fields';
const _POST_CLASS = 'post';
const _LOGIN_FORM_CLASS = '.login-form';
const _INPUT_EDIT_TAG_ID = 'tag-input';
const _INPUT_EDIT_PHOTO_ID = 'edit-photo-input';
const _EVENT_CLICK = 'click';
const _EVENT_CHANGE = 'change';
const _EVENT_INPUT = 'input';
const _EVENT_SUBMIT = 'submit';
const _BTN_SAVE_POST_ID = 'save-post-btn';
const _EVENT_KEYDOWN = 'keydown';
const _BTN_FILTER_ID = 'toggle-filter-btn';
const _BTN_LOAD_MORE_ID = 'load-more-btn';
const _BTN_EDIT_ADD_TAG_ID = 'add-tag-btn';
const _BTN_EDIT_CLEAR_TAG_ID = 'clear-tag';
const _BTN_FILTER_CLEAR_ID = 'clear-search-btn';
const _IMG_EDIT_DEL_TAG_ID = 'del-tag-img-btn';
const _PATH_TEMP_ALL_PHOTOS = 'resources/images/';
const _ATTR_SRC = 'src';
const _INPUT_MAIN_SEARCH_ID = 'main-search';
const filterForm = document.querySelector(View.FILTER_FORM_CLASS);
const loginForm = document.querySelector(_LOGIN_FORM_CLASS);
let timerId;
let timerMainSearch;
document.getElementById(_BTN_FILTER_ID).addEventListener(_EVENT_CLICK, () => {
    ViewHeader.showFilter();
});
document.getElementById(_BTN_LOAD_MORE_ID).addEventListener(_EVENT_CLICK, () => {
    Global.showMorePosts();
});
document.getElementById(View.BTN_LOGOUT_ID).addEventListener(_EVENT_CLICK, () => {
    Global.logOut();
});
document.getElementById(View.BTN_LOGIN_ID).addEventListener(_EVENT_CLICK, () => {
    View.login();
});
document.getElementById(View.BTN_BACK_ID).addEventListener(_EVENT_CLICK, () => {
    Global.back();
    View.clearLoginPage();
    View.clearEditPage();
});
document.getElementById(_INPUT_EDIT_PHOTO_ID).addEventListener(_EVENT_CHANGE, _loadPhotoPreview);
document.getElementById(_BTN_FILTER_CLEAR_ID).addEventListener(_EVENT_CLICK, () => {
    View.clearFilter(filterForm);
});


    function findAll() {
        const { value } = document.getElementById(_INPUT_MAIN_SEARCH_ID);
        Global.findAllIncludes(value.trim().toLowerCase());
    }

    async function _savePostGetData() {
        const description = document.getElementById(View.INPUT_EDIT_DESCRIPTION_ID).value;
        const hashTags = View.checkTags(document.querySelectorAll(View.TAG_TEXT_P_CLASS));
        if (!hashTags) {
            return false;
        }
        let photo = await _loadPhotoOnServer();
        const photoLink = "http://localhost:8080/photo?filename="+photo.answer;
        if(photo.answer === "fail"){
            return {hashTags, description};
        }
        return { photoLink, hashTags, description };
    }

    async function _savePost() {
        const post = await _savePostGetData();
        if (post) {
            const id = document.querySelector(View.EDIT_CONTAINER_CLASS).id.replace(View.EDIT_MASC, '');
            let isGood;
            isGood = id.length ? await Global.editPost(id, post) : await Global.addPhotoPost(post);
            if (isGood) {
                View.clearEditPage();
                View.hideEditPage();
                return true;
            }
        }
        View.showEditPageErrorText();
        return false;
    }

    function _loadPhotoPreview(input){
        input = input.target;
        const photo = document.getElementById(View.IMG_EDIT_PHOTO);
        const drop = document.querySelector(View.DIV_EDIT_PHOTO_CLASS);
        drop.style.background = 'transparent';
        drop.style.minHeight = '1px';
        photo.className = View.EDIT_PRE_PHOTO_CLASS.replace('.', View._EMPTY);
            if (input.files && input.files[0]) {
                let reader = new FileReader();

                reader.onload = function(e) {
                    photo.src = e.target.result;
                };

                reader.readAsDataURL(input.files[0]);
            }
    }

    async function _loadPhotoOnServer(){
        let formData = new FormData();
        let imgFile = document.getElementById("edit-photo-input").files[0];
        if(!imgFile){
            return {answer:"fail"}
        }
        formData.append("file", imgFile);
        return await PostsList.loadPhoto(formData)
    }

    function _createPostHandler() {
        Global.newPost();
    }

    function _addTags(e) {
        const tags = e.split(/[\s,.;\-_#]+/).filter(tag => tag.length)
            .map(tag => `#${tag.toLowerCase().trim()}`);
        View.showTags(tags);
    }

    function _clearTags() {
        View.removeAllTags();
    }

    function _removeTag(event) {
        let { target } = event;
        if (target.className === _IMG_EDIT_DEL_TAG_ID) {
            target = target.parentElement;
            target.parentElement.remove();
        }
    }

    function loginUser(event) {
        event.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;
        Global.loginUser({ username, password });
        View.clearLoginPage();
    }

    function _saveFilterData(data) {
        localStorage.setItem('filterForm', JSON.stringify(data));
    }


    function _filter() {
        let fConfigs = {};
        fConfigs.author = filterForm.author.value;
        fConfigs.fromDate = filterForm.fromDate.value;
        fConfigs.toDate = filterForm.toDate.value;
        fConfigs.hashTags = filterForm.hashTags.value;

        _saveFilterData(fConfigs);
        if(Object.values(fConfigs).some(config=>config.length)){
            Global.filterPosts(fConfigs);
        }
    }

    function delayFunction(event) {
        event.preventDefault();
        clearTimeout(timerId);
        timerId = setTimeout(_filter, 1000);
    }

    function delaySearch() {
        clearTimeout(timerMainSearch);
        timerMainSearch = setTimeout(findAll, 1000);
    }


    function _getPostId(target) {
        while (target && target.className !== _POST_CLASS) {
            target = target.parentNode;
        }
        return target ? target.id : target;
    }

    function _wallHandler(event) {
        const { target } = event;
        const postId = _getPostId(target);

        if (target.className === View.BTN_LIKE_PH_CLASS.replace('.', '')) {
            Global.likePost(postId);
            return true;
        }
        if (target.className === View.BTN_DELETE_POST_CLASS.replace('.', '')) {
            Global.remove(postId);
            return true;
        }

        if (target.className === View.BTN_EDIT_POST_CLASS.replace('.', '')) {
            Global.setEditPageData(postId);
            View.showEditPage();
            return true;
        }
        return false;
    }
    _filter();
    document.getElementById(View.BTN_POST_CREATE_ID).addEventListener(_EVENT_CLICK, _createPostHandler);
    document.getElementById(_BTN_EDIT_CLEAR_TAG_ID).addEventListener(_EVENT_CLICK, _clearTags);
    document.getElementById(_BTN_SAVE_POST_ID).addEventListener(_EVENT_CLICK, _savePost);
    document.getElementById(_INPUT_MAIN_SEARCH_ID).addEventListener(_EVENT_INPUT, delaySearch);
    filterForm.addEventListener(_EVENT_INPUT, delayFunction);
    loginForm.addEventListener(_EVENT_SUBMIT, loginUser);
    document.getElementById(View.WALL_ID).addEventListener(_EVENT_CLICK, _wallHandler);
    document.getElementById(_EDIT_RIGHT_FIELDS_ID).addEventListener(_EVENT_CLICK, _removeTag);

    document.getElementById(_INPUT_EDIT_TAG_ID).addEventListener(_EVENT_KEYDOWN, (e) => {
    if (e.code !== 'Enter' || e.target.value.length) {
        return;
    }
    e.preventDefault();
    _addTags(e.target.value);
    e.target.value = '';
    });

    document.getElementById(_BTN_EDIT_ADD_TAG_ID).addEventListener(_EVENT_CLICK, (e) => {
    e.preventDefault();
    let { target } = e;
    target = target.parentElement;
    const input = target.querySelector(`#${_INPUT_EDIT_TAG_ID}`);
    _addTags(input.value);
    input.value = '';
    });
}());
