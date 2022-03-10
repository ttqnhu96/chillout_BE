import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Logger, Post} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CONTROLLER_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
import { CreateUserRequest } from "../dtos/requests/create-user.request";
import { IUserService } from "../services/iuser.service";
import { IWorkplaceService } from "../services/iworkplace.service";

@Controller(CONTROLLER_CONSTANTS.USER)
@ApiTags(CONTROLLER_CONSTANTS.USER)
export class UserController {
    public readonly _logger = new Logger(UserController.name);
    constructor(@Inject(SERVICE_INTERFACE.IUSER_SERVICE) private _userService: IUserService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Register user' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @HttpCode(HttpStatus.OK)
    async registerUser(@Body() request: CreateUserRequest) {
        this._logger.log('========== Register user ==========');
        return await this._userService.createUser(request);
    }
}