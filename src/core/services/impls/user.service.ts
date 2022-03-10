import { Inject, Injectable, Logger } from "@nestjs/common";
import { ErrorMap } from "../../common/error.map";
import { REPOSITORY_INTERFACE } from "../../config/module.config";
import { ResponseDto } from "../../dtos/responses/response.dto";
import { BaseService } from "./base.service";
import { IUserService } from "../iuser.service";
import { IUserRepository } from "../../repositories/iuser.repository";
import { CreateUserRequest } from "../../dtos/requests/create-user.request";
import { AutoMapperUtil } from "../../utils/auto-mapper/auto-mapper.util";
import { MAPPER_CONFIG } from "../../config/mapper.config";
import { AuthService } from "./auth.service";
import { USER_STATUS_ENUM, USER_TYPE_ENUM } from "src/core/common/constants/common.constant";
const bcrypt = require('bcrypt');

@Injectable()
export class UserService extends BaseService implements IUserService {
    private readonly _logger = new Logger(UserService.name);
    constructor(@Inject(REPOSITORY_INTERFACE.IUSER_REPOSITORY) private _userRepos: IUserRepository) {
        super(_userRepos);
        this._logger.log("============== Constructor UserService ==============");
    }

    /**
     * createUser
     * @param request
     */
    async createUser(request: CreateUserRequest): Promise<ResponseDto> {
        this._logger.log("============== Create user ==============");
        const res = new ResponseDto;
        try {
            //Check username existence
            const checkedUser = await this._userRepos.findOne({ username: request.username });
            if (checkedUser) {
                return res.return(ErrorMap.E001.Code);
            }

            //Hash password
            request.password = await this.hashPassword(request.password);

            //save to User table
            const dataMapper = AutoMapperUtil.map(MAPPER_CONFIG.CREATE_USER_MAPPING, request);
            dataMapper.user_type = USER_TYPE_ENUM.PERSONAL;
            dataMapper.user_status = USER_STATUS_ENUM.ACTIVE;
            const user = await this._userRepos.create(dataMapper);

            return res.return(ErrorMap.SUCCESSFUL.Code, user);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * getUserByUsername
     * @param
     */
    async getUserByUsername(username: string): Promise<ResponseDto> {
        this._logger.log("============== Get user by username ==============");
        const res = new ResponseDto();
        try {
            const user = await this._userRepos.findOne({ username: username });
            if (!user) {
                return res.return(ErrorMap.E001.Code);
            }

            return res.return(ErrorMap.SUCCESSFUL.Code, user);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }
}