import { UserEntity } from "../entities/user.entity";
import { AutoMapperUtil } from "../utils/auto-mapper/auto-mapper.util";
import { MODULE_REQUEST } from "./module.config";

export const MAPPER_CONFIG = {
    CREATE_USER_MAPPING: AutoMapperUtil.createMap().mapProperties((s: UserEntity) => [s.username, s.password])
        .fromProperties((s: MODULE_REQUEST.CreateUserAbstractRequest) => [s.username, s.password]),
}