import { CreateCommentRequest } from "../dtos/requests/comment/create-comment.request";
import { UpdateCommentRequest } from "../dtos/requests/comment/update-comment.request";
import { CreatePostRequest } from "../dtos/requests/post/create-post.request";
import { UpdatePostRequest } from "../dtos/requests/post/update-post.request";
import { UpdateAvatarRequest } from "../dtos/requests/profile/update-avatar.request";
import { UpdateProfileRequest } from "../dtos/requests/profile/update-profile.request";
import { CreateUserRequest } from "../dtos/requests/user/create-user.request";
import { UpdateUserLanguageRequest } from "../dtos/requests/user/update-user-language.request";
import { CityEntity } from "../entities/city.entity";
import { CollegeEntity } from "../entities/college.entity";
import { CommentEntity } from "../entities/comment.entity";
import { PhotoEntity } from "../entities/photo.entity";
import { PostEntity } from "../entities/post.entity";
import { ProfileEntity } from "../entities/profile.entity";
import { SchoolEntity } from "../entities/school.entity";
import { UserEntity } from "../entities/user.entity";
import { WorkplaceEntity } from "../entities/workplace.entity";

export const ENTITIES_CONFIG = {
    CITY: CityEntity,
    SCHOOL: SchoolEntity,
    COLLEGE: CollegeEntity,
    WORKPLACE: WorkplaceEntity,
    USER: UserEntity,
    PROFILE: ProfileEntity,
    POST: PostEntity,
    PHOTO: PhotoEntity,
    COMMENT: CommentEntity
}

export const SERVICE_INTERFACE = {
    ICITY_SERVICE: 'ICityService',
    ISCHOOL_SERVICE: 'ISchoolService',
    ICOLLEGE_SERVICE: 'ICollegeService',
    IWORKPLACE_SERVICE: 'IWorkplaceService',
    IUSER_SERVICE: 'IUserService',
    IPROFILE_SERVICE: 'IProfilerService',
    IPOST_SERVICE: 'IPostService',
    IPHOTO_SERVICE: 'IPhotoService',
    IUPLOAD_SERVICE: 'IUploadService',
    ICOMMENT_SERVICE: 'ICommentService'
}

export const REPOSITORY_INTERFACE = {
    ICITY_REPOSITORY: 'ICityRepository',
    ISCHOOL_REPOSITORY: 'ISchoolRepository',
    ICOLLEGE_REPOSITORY: 'ICollegeRepository',
    IWORKPLACE_REPOSITORY: 'IWorkplaceRepository',
    IUSER_REPOSITORY: 'IUserRepository',
    IPROFILE_REPOSITORY: 'IProfileRepository',
    IPOST_REPOSITORY: 'IPostRepository',
    IPHOTO_REPOSITORY: 'IPhotoRepository',
    ICOMMENT_REPOSITORY: 'ICommentRepository'
}

export const REQUEST_CONFIG = {
    CREATE_USER_REQUEST: CreateUserRequest,
    UPDATE_PROFILE_REQUEST: UpdateProfileRequest,
    UPDATE_USER_LANGUAGE_REQUEST: UpdateUserLanguageRequest,
    CREATE_POST_REQUEST: CreatePostRequest,
    UPDATE_POST_REQUEST: UpdatePostRequest,
    UPDATE_AVATAR_REQUEST: UpdateAvatarRequest,
    CREATE_COMMENT_REQUEST: CreateCommentRequest,
    UPDATE_COMMENT_REQUEST: UpdateCommentRequest
}

export module MODULE_REQUEST {
    export abstract class CreateUserAbstractRequest extends REQUEST_CONFIG.CREATE_USER_REQUEST{}
    export abstract class UpdateProfileAbstractRequest extends REQUEST_CONFIG.UPDATE_PROFILE_REQUEST{}
    export abstract class UpdateUserLanguageAbstractRequest extends REQUEST_CONFIG.UPDATE_USER_LANGUAGE_REQUEST{}
    export abstract class CreatePostAbstractRequest extends REQUEST_CONFIG.CREATE_POST_REQUEST{}
    export abstract class UpdatePostAbstractRequest extends REQUEST_CONFIG.UPDATE_POST_REQUEST{}
    export abstract class UpdateAvatarAbstractRequest extends REQUEST_CONFIG.UPDATE_AVATAR_REQUEST{}
    export abstract class CreateCommentAbstractRequest extends REQUEST_CONFIG.CREATE_COMMENT_REQUEST{}
    export abstract class UpdateCommentAbstractRequest extends REQUEST_CONFIG.UPDATE_COMMENT_REQUEST{}
}