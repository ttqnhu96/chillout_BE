import { Inject, Injectable, Logger } from "@nestjs/common";
import { APP_CONSTANTS } from "../../common/constants/common.constant";
import { IUserRepository } from "../../repositories/iuser.repository";
import { REPOSITORY_INTERFACE } from "../../config/module.config";
import { IAuthService } from "../iauth.service";
import { BaseService } from "./base.service";
import { ContextService } from "../../../providers/context.service";

@Injectable()
export class AuthService extends BaseService implements IAuthService {
    private readonly _logger = new Logger(AuthService.name);
    private static _authUserKey = APP_CONSTANTS.USER_KEY;
    constructor(@Inject(REPOSITORY_INTERFACE.IUSER_REPOSITORY) private _userRepos: IUserRepository) {
        super(_userRepos);
        this._logger.log("============== Constructor AuthService ==============");
    }

    static setAuthUser(user) {
        ContextService.set(AuthService._authUserKey, user);
    }

    static getAuthUser() {
        return ContextService.get(AuthService._authUserKey);
    }
}