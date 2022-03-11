import { CreateUserRequest } from "../dtos/requests/user/create-user.request";
import { CityEntity } from "../entities/city.entity";
import { CollegeEntity } from "../entities/college.entity";
import { SchoolEntity } from "../entities/school.entity";
import { UserEntity } from "../entities/user.entity";
import { WorkplaceEntity } from "../entities/workplace.entity";

export const ENTITIES_CONFIG = {
    CITY: CityEntity,
    SCHOOL: SchoolEntity,
    COLLEGE: CollegeEntity,
    WORKPLACE: WorkplaceEntity,
    USER: UserEntity
}

export const SERVICE_INTERFACE = {
    ICITY_SERVICE: 'ICityService',
    ISCHOOL_SERVICE: 'ISchoolService',
    ICOLLEGE_SERVICE: 'ICollegeService',
    IWORKPLACE_SERVICE: 'IWorkplaceService',
    IUSER_SERVICE: 'IUserService',
}

export const REPOSITORY_INTERFACE = {
    ICITY_REPOSITORY: 'ICityRepository',
    ISCHOOL_REPOSITORY: 'ISchoolRepository',
    ICOLLEGE_REPOSITORY: 'ICollegeRepository',
    IWORKPLACE_REPOSITORY: 'IWorkplaceRepository',
    IUSER_REPOSITORY: 'IUserRepository',
}

export const REQUEST_CONFIG = {
    CREATE_USER_REQUEST: CreateUserRequest,
}

export module MODULE_REQUEST {
    export abstract class CreateUserAbstractRequest extends REQUEST_CONFIG.CREATE_USER_REQUEST{}
}