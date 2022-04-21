import { CityEntity } from "../entities/city.entity";
import { CollegeEntity } from "../entities/college.entity";
import { CommentEntity } from "../entities/comment.entity";
import { FriendRequestEntity } from "../entities/friend-request.entity";
import { PostEntity } from "../entities/post.entity";
import { ProfileEntity } from "../entities/profile.entity";
import { SchoolEntity } from "../entities/school.entity";
import { UserEntity } from "../entities/user.entity";
import { WorkplaceEntity } from "../entities/workplace.entity";
import { AutoMapperUtil } from "../utils/auto-mapper/auto-mapper.util";
import { MODULE_REQUEST } from "./module.config";

export const MAPPER_CONFIG = {
    CREATE_USER_MAPPING: AutoMapperUtil.createMap().mapProperties((s: UserEntity) => [s.username, s.password])
        .fromProperties((s: MODULE_REQUEST.CreateUserAbstractRequest) => [s.username, s.password]),

    CREATE_PROFILE_MAPPING: AutoMapperUtil.createMap().mapProperties((s: ProfileEntity) => [s.firstName, s.lastName, s.gender])
        .fromProperties((s: MODULE_REQUEST.CreateUserAbstractRequest) => [s.firstName, s.lastName, s.gender]),

    UPDATE_PROFILE_MAPPING: AutoMapperUtil.createMap().mapProperties((s: ProfileEntity) => [s.firstName, s.lastName, s.gender, s.birthday, s.phone, s.email, s.bio, s.cityId, s.schoolId, s.collegeId, s.workplaceId])
        .fromProperties((s: MODULE_REQUEST.UpdateProfileAbstractRequest) => [s.firstName, s.lastName, s.gender, s.birthday, s.phone, s.email, s.bio, s.cityId, s.schoolId, s.collegeId, s.workplaceId]),

    UPDATE_USER_LANGUAGE_MAPPING: AutoMapperUtil.createMap().mapProperties((s: UserEntity) => [s.id, s.language])
        .fromProperties((s: MODULE_REQUEST.UpdateUserLanguageAbstractRequest) => [s.userId, s.language]),

    CREATE_POST_MAPPING: AutoMapperUtil.createMap().mapProperties((s: PostEntity) => [s.content, s.privacySettingId])
        .fromProperties((s: MODULE_REQUEST.CreatePostAbstractRequest) => [s.content, s.privacySettingId]),

    UPDATE_POST_MAPPING: AutoMapperUtil.createMap().mapProperties((s: PostEntity) => [s.content, s.privacySettingId])
        .fromProperties((s: MODULE_REQUEST.UpdatePostAbstractRequest) => [s.content, s.privacySettingId]),

    UPDATE_AVATAR_MAPPING: AutoMapperUtil.createMap().mapProperties((s: ProfileEntity) => [s.id, s.avatar])
        .fromProperties((s: MODULE_REQUEST.UpdateAvatarAbstractRequest) => [s.profileId, s.avatar]),

    CREATE_COMMENT_MAPPING: AutoMapperUtil.createMap().mapProperties((s: CommentEntity) => [s.postId, s.content])
        .fromProperties((s: MODULE_REQUEST.CreateCommentAbstractRequest) => [s.postId, s.content]),

    UPDATE_COMMENT_MAPPING: AutoMapperUtil.createMap().mapProperties((s: CommentEntity) => [s.content])
        .fromProperties((s: MODULE_REQUEST.UpdateCommentAbstractRequest) => [s.content]),

    CREATE_CITY_MAPPING: AutoMapperUtil.createMap().mapProperties((s: CityEntity) => [s.name])
        .fromProperties((s: MODULE_REQUEST.CreateCityAbstractRequest) => [s.name]),

    CREATE_COLLEGE_MAPPING: AutoMapperUtil.createMap().mapProperties((s: CollegeEntity) => [s.name])
        .fromProperties((s: MODULE_REQUEST.CreateCollegeAbstractRequest) => [s.name]),

    CREATE_SCHOOL_MAPPING: AutoMapperUtil.createMap().mapProperties((s: SchoolEntity) => [s.name])
        .fromProperties((s: MODULE_REQUEST.CreateSchoolAbstractRequest) => [s.name]),

    CREATE_WORKPLACE_MAPPING: AutoMapperUtil.createMap().mapProperties((s: WorkplaceEntity) => [s.name])
        .fromProperties((s: MODULE_REQUEST.CreateWorkplaceAbstractRequest) => [s.name]),

    CREATE_FRIEND_REQUEST_MAPPING: AutoMapperUtil.createMap().mapProperties((s: FriendRequestEntity) => [s.receiverId])
        .fromProperties((s: MODULE_REQUEST.CreateFriendRequestAbstractRequest) => [s.receiverId]),

}