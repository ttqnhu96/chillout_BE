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
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ENV_CONFIG } from "../shared/services/config.service";
import { ProfileRepository } from "./repositories/impls/profile.repository";
import { ProfileService } from "./services/impls/profile.service";
import { PostRepository } from "./repositories/impls/post.repository";
import { PostService } from "./services/impls/post.service";
import { PostController } from "./controllers/post.controller";
import { PhotoRepository } from "./repositories/impls/photo.repository";
import { PhotoService } from "./services/impls/photo.service";
import { PhotoController } from "./controllers/photo.controller";
import { UploadFileService } from "./services/impls/upload-file.service";
import { UploadFileController } from "./controllers/upload-file.controller";
import { S3UploadFileUtil } from "./utils/aws-s3/s3-upload-file.util";
import { CommentController } from "./controllers/comment.controller";
import { CommentService } from "./services/impls/comment.service";
import { CommentRepository } from "./repositories/impls/comment.repository";
import { PostLikedUsersRepository } from "./repositories/impls/post-liked-users.repository";
import { CommonController } from "./controllers/common.controller";
import { CommonService } from "./services/impls/common.service";
import { AppGateway } from "src/gatewaies/app.gateway";
import { DeviceRepository } from "./repositories/impls/device.repository";
import { RelationshipRepository } from "./repositories/impls/relationship.repository";
import { RelationshipService } from "./services/impls/relationship.service";
import { RelationshipController } from "./controllers/relationship.controller";
import { FriendRequestController } from "./controllers/friend-request.controller";
import { FriendRequestRepository } from "./repositories/impls/friend-request.repository";
import { FriendRequestService } from "./services/impls/friend-request.service";
import { NotificationController } from "./controllers/notification.controller";
import { NotificationService } from "./services/impls/notification.service";
import { NotificationRepository } from "./repositories/impls/notification.repository";

const controllers = [
    UserController,
    ProfileController,
    PostController,
    PhotoController,
    UploadFileController,
    CommentController,
    CityController,
    SchoolController,
    CollegeController,
    WorkplaceController,
    CommonController,
    RelationshipController,
    FriendRequestController,
    NotificationController
];

const entities = [
    ENTITIES_CONFIG.CITY,
    ENTITIES_CONFIG.SCHOOL,
    ENTITIES_CONFIG.COLLEGE,
    ENTITIES_CONFIG.WORKPLACE,
    ENTITIES_CONFIG.USER,
    ENTITIES_CONFIG.PROFILE,
    ENTITIES_CONFIG.POST,
    ENTITIES_CONFIG.PHOTO,
    ENTITIES_CONFIG.COMMENT,
    ENTITIES_CONFIG.POST_LIKED_USERS,
    ENTITIES_CONFIG.DEVICE,
    ENTITIES_CONFIG.RELATIONSHIP,
    ENTITIES_CONFIG.FRIEND_REQUEST,
    ENTITIES_CONFIG.NOTIFICATION
]

const providers = [
    S3UploadFileUtil,
    AppGateway
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
        {
            provide: REPOSITORY_INTERFACE.IPOST_REPOSITORY,
            useClass: PostRepository
        },
        {
            provide: REPOSITORY_INTERFACE.IPHOTO_REPOSITORY,
            useClass: PhotoRepository
        },
        {
            provide: REPOSITORY_INTERFACE.ICOMMENT_REPOSITORY,
            useClass: CommentRepository
        },
        {
            provide: REPOSITORY_INTERFACE.IPOST_LIKED_USERS_REPOSITORY,
            useClass: PostLikedUsersRepository
        },
        {
            provide: REPOSITORY_INTERFACE.IDEVICE_REPOSITORY,
            useClass: DeviceRepository
        },
        {
            provide: REPOSITORY_INTERFACE.IRELATIONSHIP_REPOSITORY,
            useClass: RelationshipRepository
        },
        {
            provide: REPOSITORY_INTERFACE.IFRIEND_REQUEST_REPOSITORY,
            useClass: FriendRequestRepository
        },
        {
            provide: REPOSITORY_INTERFACE.INOTIFICATION_REPOSITORY,
            useClass: NotificationRepository
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
        {
            provide: SERVICE_INTERFACE.IPOST_SERVICE,
            useClass: PostService
        },
        {
            provide: SERVICE_INTERFACE.IPHOTO_SERVICE,
            useClass: PhotoService
        },
        {
            provide: SERVICE_INTERFACE.IUPLOAD_SERVICE,
            useClass: UploadFileService
        },
        {
            provide: SERVICE_INTERFACE.ICOMMENT_SERVICE,
            useClass: CommentService
        },
        {
            provide: SERVICE_INTERFACE.ICOMMON_SERVICE,
            useClass: CommonService
        },
        {
            provide: SERVICE_INTERFACE.IRELATIONSHIP_SERVICE,
            useClass: RelationshipService
        },
        {
            provide: SERVICE_INTERFACE.IFRIEND_REQUEST_SERVICE,
            useClass: FriendRequestService
        },
        {
            provide: SERVICE_INTERFACE.INOTIFICATION_SERVICE,
            useClass: NotificationService
        },
        //Provider


        //Sigal service
        ...providers,
    ],
    exports: []
})
export class CoreModule {

}