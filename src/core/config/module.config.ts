import { CityEntity } from "../entities/city.entity";
import { College } from "../entities/college.entity";
// import { School } from "../entities/school.entity";
// import { Workplace } from "../entities/workplace.entity";

export const ENTITIES_CONFIG = {
    CITY: CityEntity,
    // SCHOOL: School,
    // COLLEGE: College,
    // WORKPLACE: Workplace
}

export const SERVICE_INTERFACE = {
    ICITY_SERVICE: 'ICityService',
}

export const REPOSITORY_INTERFACE = {
    ICITY_REPOSITORY: 'ICityRepository',
}