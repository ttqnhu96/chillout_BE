import { PostEntity } from "../entities/post.entity";
import { ProfileEntity } from "../entities/profile.entity";
import { UserEntity } from "../entities/user.entity";
import { AutoMapperUtil } from "../utils/auto-mapper/auto-mapper.util";
import { MODULE_REQUEST } from "./module.config";

export const MAPPER_CONFIG = {
    CREATE_USER_MAPPING: AutoMapperUtil.createMap().mapProperties((s: UserEntity) => [s.username, s.password])
        .fromProperties((s: MODULE_REQUEST.CreateUserAbstractRequest) => [s.username, s.password]),

    CREATE_PROFILE_MAPPING: AutoMapperUtil.createMap().mapProperties((s: ProfileEntity) => [s.fullName, s.gender])
        .fromProperties((s: MODULE_REQUEST.CreateUserAbstractRequest) => [s.fullName, s.gender]),

    UPDATE_PROFILE_MAPPING: AutoMapperUtil.createMap().mapProperties((s: ProfileEntity) => [s.fullName, s.gender, s.birthday, s.phone, s.email, s.bio, s.cityId, s.schoolId, s.collegeId, s.workplaceId])
        .fromProperties((s: MODULE_REQUEST.UpdateProfileAbstractRequest) => [s.fullName, s.gender, s.birthday, s.phone, s.email, s.bio, s.cityId, s.schoolId, s.collegeId, s.workplaceId]),

    UPDATE_USER_LANGUAGE_MAPPING: AutoMapperUtil.createMap().mapProperties((s: UserEntity) => [s.id, s.language])
        .fromProperties((s: MODULE_REQUEST.UpdateUserLanguageAbstractRequest) => [s.userId, s.language]),

    CREATE_POST_MAPPING: AutoMapperUtil.createMap().mapProperties((s: PostEntity) => [s.content, s.privacySettingId])
        .fromProperties((s: MODULE_REQUEST.CreatePostAbstractRequest) => [s.content, s.privacySettingId]),

    UPDATE_POST_MAPPING: AutoMapperUtil.createMap().mapProperties((s: PostEntity) => [s.content, s.privacySettingId])
        .fromProperties((s: MODULE_REQUEST.UpdatePostAbstractRequest) => [s.content, s.privacySettingId]),
}