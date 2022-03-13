import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CityController } from "./controllers/city.controller";
import { ENTITIES_CONFIG, REPOSITORY_INTERFACE, SERVICE_INTERFACE } from "./config/module.config";
import { CityRepository } from "./repositories/impls/city.repository";
import { CityService } from "./services/impls/city.service";
import { SchoolController } from "./controllers/school.controller";
import { SchoolRepository } from "./repositories/impls/school.repository";
import { SchoolService } from "./services/impls/school.service";
import { CollegeController } from "./controllers/college.controller";
import { WorkplaceController } from "./controllers/workplace.controller";
import { CollegeRepository } from "./repositories/impls/college.repository";
import { WorkplaceRepository } from "./repositories/impls/workplace.repository";
import { CollegeService } from "./services/impls/college.service";
import { WorkplaceService } from "./services/impls/workplace.service";
import { UserService } from "./services/impls/user.service";
import { UserRepository } from "./repositories/impls/user.repository";
import { UserController } from "./controllers/user.controller";
import { ProfileController } from "./controllers/profile.controller";
import { JwtModule } from '@nestjs/jwt';
import { ENV_CONFIG } from "../shared/services/config.service";
import { ProfileRepository } from "./repositories/impls/profile.repository";
import { ProfileService } from "./services/impls/profile.service";

const controllers = [
    CityController,
    SchoolController,
    CollegeController,
    WorkplaceController,
    UserController,
    ProfileController
];

const entities = [
    ENTITIES_CONFIG.CITY,
    ENTITIES_CONFIG.SCHOOL,
    ENTITIES_CONFIG.COLLEGE,
    ENTITIES_CONFIG.WORKPLACE,
    ENTITIES_CONFIG.USER,
    ENTITIES_CONFIG.PROFILE
]

const providers = [
]

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([...entities]),
        JwtModule.register({
            secret: ENV_CONFIG.JWT_SECRET_KEY,
            signOptions: { expiresIn: ENV_CONFIG.EXPIRES_TIME },
        }),
    ],
    controllers: [...controllers],
    providers: [
        //repository
        {
            provide: REPOSITORY_INTERFACE.ICITY_REPOSITORY,
            useClass: CityRepository
        },
        {
            provide: REPOSITORY_INTERFACE.ISCHOOL_REPOSITORY,
            useClass: SchoolRepository
        },
        {
            provide: REPOSITORY_INTERFACE.ICOLLEGE_REPOSITORY,
            useClass: CollegeRepository
        },
        {
            provide: REPOSITORY_INTERFACE.IWORKPLACE_REPOSITORY,
            useClass: WorkplaceRepository
        },
        {
            provide: REPOSITORY_INTERFACE.IUSER_REPOSITORY,
            useClass: UserRepository
        },
        {
            provide: REPOSITORY_INTERFACE.IPROFILE_REPOSITORY,
            useClass: ProfileRepository
        },

        //service
        {
            provide: SERVICE_INTERFACE.ICITY_SERVICE,
            useClass: CityService
        },
        {
            provide: SERVICE_INTERFACE.ISCHOOL_SERVICE,
            useClass: SchoolService
        },
        {
            provide: SERVICE_INTERFACE.ICOLLEGE_SERVICE,
            useClass: CollegeService
        },
        {
            provide: SERVICE_INTERFACE.IWORKPLACE_SERVICE,
            useClass: WorkplaceService
        },
        {
            provide: SERVICE_INTERFACE.IUSER_SERVICE,
            useClass: UserService
        },
        {
            provide: SERVICE_INTERFACE.IPROFILE_SERVICE,
            useClass: ProfileService
        },
        //Provider


        //Sigal service
        ...providers,
    ],
    exports: []
})
export class CoreModule {

}