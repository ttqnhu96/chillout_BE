import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CityController } from "./controllers/city.controller";
import { ENTITIES_CONFIG, REPOSITORY_INTERFACE, SERVICE_INTERFACE } from "./config/module.config";
import { CityRepository } from "./repositories/impls/city.repository";
import { CityService } from "./services/impls/city.service";

const controllers = [
    CityController,
];

const entities = [
    ENTITIES_CONFIG.CITY,
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
        //service
        {
            provide: SERVICE_INTERFACE.ICITY_SERVICE,
            useClass: CityService
        },
        //Provider


        //Sigal service
        ...providers,
    ],
    exports: []
})
export class CoreModule {

}