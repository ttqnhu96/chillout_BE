export enum APP_CONSTANTS {
    USER_KEY = 'user_key',
}

export const COMMON_CONSTANTS = {
    REGEX_USERNAME: new RegExp(/^$|[a-zA-Z0-9_]+$/),
    REGEX_EMAIL: new RegExp(/^(|[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,})$/),
    //REGEX_NAME_WITHOUT_SPECIAL_CHARACTER: new RegExp(/^(|[\p{L}\p{Nd}\s]{0,})$/u),
    TIMEZONE: 'UTC',
    START_TIME_STR: '00:00:00',
}

export const S3_UPLOAD_FOLDER = {
    UPLOAD: 'upload'
}

export enum ORDER_BY {
    DESC = 'DESC',
    ASC = 'ASC'
}

export enum USER_TYPE_ENUM {
    PERSONAL = 'Personal',
    BUSINESS = 'Business'
}

export enum USER_STATUS_ENUM {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive'
}

export enum GENDER_ENUM {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other'
}

export enum PRIVACY_SETTING {
    ONLY_ME = 'Only me',
    PUBLIC = 'Public',
    FRIENDS = 'Friends',
    FRIENDS_EXCEPT = 'Friends except',
    SPECIFIC_FRIENDS = 'Specific friends'
}

export enum LANGUAGE_ENUM {
    VIETNAMESE = 'VI',
    ENGLISH = 'ENG'
}