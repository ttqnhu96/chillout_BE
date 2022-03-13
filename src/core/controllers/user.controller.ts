import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Logger, Param, Post, Put, UseGuards, UseInterceptors} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CONTROLLER_CONSTANTS, URL_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
import { CreateUserRequest } from "../dtos/requests/user/create-user.request";
import { LoginRequest } from "../dtos/requests/user/login.request";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { IUserService } from "../services/iuser.service";
import { AuthUserInterceptor } from "../../interceptors/auth-user-interceptor.service";
import { UpdateUserLanguageRequest } from "../dtos/requests/user/update-user-language.request";

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

    @Post(URL_CONSTANTS.LOGIN)
    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @HttpCode(HttpStatus.OK)
    async signin(@Body() request: LoginRequest) {
        this._logger.log(`========== Login ==========`);
        return await this._userService.login(request);
    }

    @Get(URL_CONSTANTS.GET_BY_USERNAME)
    @ApiOperation({ summary: 'Get user by username' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async getUserByUsername(@Param('username') username: string) {
        this._logger.log('========== Get user by username ==========');
        return await this._userService.getUserByUsername(username);
    }

    @Put(URL_CONSTANTS.UPDATE_LANGUAGE)
    @ApiOperation({ summary: 'Update user language' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async updateUserLanguage(@Body() request: UpdateUserLanguageRequest) {
        this._logger.log('========== Update user language ==========');
        return await this._userService.updateUserLanguage(request);
    }
}