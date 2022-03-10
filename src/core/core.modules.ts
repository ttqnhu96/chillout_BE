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

const controllers = [
    CityController,
    SchoolController,
    CollegeController,
    WorkplaceController
];

const entities = [
    ENTITIES_CONFIG.CITY,
    ENTITIES_CONFIG.SCHOOL,
    ENTITIES_CONFIG.COLLEGE,
    ENTITIES_CONFIG.WORKPLACE,
]

const providers= [
    ]

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([...entities]),
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
        //Provider


        //Sigal service
        ...providers,
    ],
    exports: []
})
export class CoreModule {

}