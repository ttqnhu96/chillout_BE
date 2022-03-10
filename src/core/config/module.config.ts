import { CityEntity } from "../entities/city.entity";
import { CollegeEntity } from "../entities/college.entity";
import { SchoolEntity } from "../entities/school.entity";
import { WorkplaceEntity } from "../entities/workplace.entity";

export const ENTITIES_CONFIG = {
    CITY: CityEntity,
    SCHOOL: SchoolEntity,
    COLLEGE: CollegeEntity,
    WORKPLACE: WorkplaceEntity
}

export const SERVICE_INTERFACE = {
    ICITY_SERVICE: 'ICityService',
    ISCHOOL_SERVICE: 'ISchoolService',
    ICOLLEGE_SERVICE: 'ICollegeService',
    IWORKPLACE_SERVICE: 'IWorkplaceService',
}

export const REPOSITORY_INTERFACE = {
    ICITY_REPOSITORY: 'ICityRepository',
    ISCHOOL_REPOSITORY: 'ISchoolRepository',
    ICOLLEGE_REPOSITORY: 'ICollegeRepository',
    IWORKPLACE_REPOSITORY: 'IWorkplaceRepository',
}