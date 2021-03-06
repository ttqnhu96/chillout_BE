export const CONTROLLER_CONSTANTS = {
    APP: 'app',
    COMMON: 'common',
    CITY: 'city',
    SCHOOL: 'school',
    COLLEGE: 'college',
    WORKPLACE: 'workplace',
    USER: 'user',
    PROFILE: 'profile',
    POST: 'post',
    PHOTO: 'photo',
    UPLOAD_FILE: 'upload-file',
    COMMENT: 'comment',
    RELATIONSHIP: 'relationship',
    FRIEND_REQUEST: 'friend-request',
    NOTIFICATION: 'notification'
}

export const URL_CONSTANTS = {
    LOGIN: 'login',
    GET_BY_USERNAME: ':username',
    GET_BY_ID: ':id',
    DELETE: ':id',
    GET_DETAIL: 'detail/:userId',
    UPDATE: ':id',
    UPDATE_LANGUAGE: 'update/language',
    UPDATE_LIKES: 'update/likes',
    GET_POST_LIST_NEWS_FEED: 'list-newsfeed',
    GET_POST_LIST_WALL: 'list-wall',
    GET_LIST_USERS_LIKE_POST: 'list-users-like-post',
    GET_PHOTO_LIST_BY_USER_ID: 'list',
    UPLOAD_SINGLE_IMAGE: 'upload-single-image/:folderName',
    UPLOAD_MULTI_IMAGE: 'upload-multi-image/:folderName',
    UPDATE_AVATAR: 'update/avatar',
    GET_COMMENT_LIST_BY_POST_ID: 'list',
    SEARCH: 'search',
    GET_SUGGESTIONS_LIST: 'list-suggestions',
    GET_FRIEND_LIST: 'list-friends',
    GET_RECEIVED_FRIEND_REQUEST_LIST: 'list-received',
    ACCEPT_FRIEND_REQUEST: ':id',
    GET_RELATIONSHIP_WITH_CURRENT_USER: 'get-relationship-with-current-user',
    GET_NOTIFICATION_LIST_BY_RECEIVER_ID: 'list',
}