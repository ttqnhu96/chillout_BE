import { Inject, Injectable, Logger } from "@nestjs/common";
import { ErrorMap } from "../../common/error.map";
import { REPOSITORY_INTERFACE } from "../../config/module.config";
import { ResponseDto } from "../../dtos/responses/response.dto";
import { BaseService } from "./base.service";
import { IUserService } from "../iuser.service";
import { IUserRepository } from "../../repositories/iuser.repository";
import { CreateUserRequest } from "../../dtos/requests/user/create-user.request";
import { AutoMapperUtil } from "../../utils/auto-mapper/auto-mapper.util";
import { MAPPER_CONFIG } from "../../config/mapper.config";
import { APP_CONSTANTS, COMMON_CONSTANTS, LANGUAGE_ENUM, USER_STATUS_ENUM, USER_TYPE_ENUM } from "../../common/constants/common.constant";
import { ContextService } from "../../../providers/context.service";
const bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
import { LoginRequest } from "../../dtos/requests/user/login.request";
import { AuthPayload } from "../../../interfaces/auth-payload.interface";
import { CommonUtil } from "../../utils/common.util";
import { IProfileRepository } from "../../repositories/iprofile.repository";
import { UpdateUserLanguageRequest } from "../../dtos/requests/user/update-user-language.request";

@Injectable()
export class UserService extends BaseService implements IUserService {
    private readonly _logger = new Logger(UserService.name);
    private static _authUserKey = APP_CONSTANTS.USER_KEY;
    private _commonUtil: CommonUtil = new CommonUtil();
    constructor(@Inject(REPOSITORY_INTERFACE.IUSER_REPOSITORY) private _userRepos: IUserRepository,
        @Inject(REPOSITORY_INTERFACE.IPROFILE_REPOSITORY) private _profileRepos: IProfileRepository,
        private _jwtService: JwtService) {
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
            //Check user existence
            const checkedUser = await this._userRepos.findOne({ username: request.username });
            if (checkedUser) {
                return res.return(ErrorMap.E001.Code);
            }

            //Save to Profile table
            const profileMapper = AutoMapperUtil.map(MAPPER_CONFIG.CREATE_PROFILE_MAPPING, request);
            profileMapper.birthday = new Date(`${request.birthday} ${COMMON_CONSTANTS.START_TIME_STR}`);
            const profile = await this._profileRepos.create(profileMapper);
            const profileId = profile.id;

            request.username = request.username.toLowerCase();
            //Hash password
            request.password = await this.hashPassword(request.password);

            //save to User table
            const userMapper = AutoMapperUtil.map(MAPPER_CONFIG.CREATE_USER_MAPPING, request);
            userMapper.userType = USER_TYPE_ENUM.PERSONAL;
            userMapper.userStatus = USER_STATUS_ENUM.ACTIVE;
            userMapper.language = LANGUAGE_ENUM.VIETNAMESE;
            userMapper.profileId = profileId;
            const user = await this._userRepos.create(userMapper);

            return res.return(ErrorMap.SUCCESSFUL.Code, user);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * login
     * @param request
     */
    async login(request: LoginRequest): Promise<any> {
        this._logger.log("============== Login ==============");
        const res = new ResponseDto;
        try {
            const user = await this._userRepos.findOne({ username: request.username });
            if (!user) {
                return res.return(ErrorMap.E003.Code);
            }
            if (user.userStatus !== USER_STATUS_ENUM.ACTIVE) {
                return res.return(ErrorMap.E004.Code);
            }

            const checkPassword = await this.comparePassword(request.password, user.password);
            if (!checkPassword) {
                return res.return(ErrorMap.E005.Code);
            }

            const data: AuthPayload = {
                id: user.id,
                username: user.username,
                userType: user.userType
            };

            data['accessToken'] = this._jwtService.sign(data);
            return res.return(ErrorMap.SUCCESSFUL.Code, data)
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
                return res.return(ErrorMap.E002.Code);
            }

            const currentUser = await this._commonUtil.getUsername();
            if (currentUser !== username) {
                return res.return(ErrorMap.E006.Code);
            }

            return res.return(ErrorMap.SUCCESSFUL.Code, user);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * updateUserLanguage
     * @param request
     */
    async updateUserLanguage(request: UpdateUserLanguageRequest): Promise<any> {
        this._logger.log("============== Update user language ==============");
        const res = new ResponseDto();
        try {
            // Check user existence
            const checkedUser = await this._userRepos.findOne(request.userId);
            if (!checkedUser) {
                return res.return(ErrorMap.E002.Code);
            }

            // Check access permission
            const currentUsername = await this._commonUtil.getUsername();
            if (currentUsername !== checkedUser.username) {
                return res.return(ErrorMap.E008.Code);
            }

            const dataMapper = AutoMapperUtil.map(MAPPER_CONFIG.UPDATE_USER_LANGUAGE_MAPPING, request);
            const user = await this._userRepos.update(dataMapper);

            return res.return(ErrorMap.SUCCESSFUL.Code, user);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }





    static setAuthUser(user) {
        ContextService.set(this._authUserKey, user);
    }

    static getAuthUser() {
        return ContextService.get(this._authUserKey);
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }

    async comparePassword(password: string, storePasswordHash: string): Promise<any> {
        return await bcrypt.compare(password, storePasswordHash);
    }
}