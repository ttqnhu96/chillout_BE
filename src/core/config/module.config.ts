import { UpdateProfileRequest } from "../dtos/requests/profile/update-profile.request";
import { CreateUserRequest } from "../dtos/requests/user/create-user.request";
import { UpdateUserLanguageRequest } from "../dtos/requests/user/update-user-language.request";
import { CityEntity } from "../entities/city.entity";
import { CollegeEntity } from "../entities/college.entity";
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
    PROFILE: ProfileEntity
}

export const SERVICE_INTERFACE = {
    ICITY_SERVICE: 'ICityService',
    ISCHOOL_SERVICE: 'ISchoolService',
    ICOLLEGE_SERVICE: 'ICollegeService',
    IWORKPLACE_SERVICE: 'IWorkplaceService',
    IUSER_SERVICE: 'IUserService',
    IPROFILE_SERVICE: 'IProfilerService',
}

export const REPOSITORY_INTERFACE = {
    ICITY_REPOSITORY: 'ICityRepository',
    ISCHOOL_REPOSITORY: 'ISchoolRepository',
    ICOLLEGE_REPOSITORY: 'ICollegeRepository',
    IWORKPLACE_REPOSITORY: 'IWorkplaceRepository',
    IUSER_REPOSITORY: 'IUserRepository',
    IPROFILE_REPOSITORY: 'IProfileRepository',
}

export const REQUEST_CONFIG = {
    CREATE_USER_REQUEST: CreateUserRequest,
    UPDATE_PROFILE_REQUEST: UpdateProfileRequest,
    UPDATE_USER_LANGUAGE_REQUEST: UpdateUserLanguageRequest
}

export module MODULE_REQUEST {
    export abstract class CreateUserAbstractRequest extends REQUEST_CONFIG.CREATE_USER_REQUEST{}
    export abstract class UpdateProfileAbstractRequest extends REQUEST_CONFIG.UPDATE_PROFILE_REQUEST{}
    export abstract class UpdateUserLanguageAbstractRequest extends REQUEST_CONFIG.UPDATE_USER_LANGUAGE_REQUEST{}
}