import { Body, Controller, Get, Inject, Logger, Param, Put, UseGuards, UseInterceptors} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CONTROLLER_CONSTANTS, URL_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { AuthUserInterceptor } from "../../interceptors/auth-user-interceptor.service";
import { IProfileService } from "../services/iprofile.service";
import { UpdateProfileRequest } from "../dtos/requests/profile/update-profile.request";

@Controller(CONTROLLER_CONSTANTS.PROFILE)
@ApiTags(CONTROLLER_CONSTANTS.PROFILE)
export class ProfileController {
    public readonly _logger = new Logger(ProfileController.name);
    constructor(@Inject(SERVICE_INTERFACE.IPROFILE_SERVICE) private _profileService: IProfileService
    ) { }

    @Get(URL_CONSTANTS.GET_BY_ID)
    @ApiOperation({ summary: 'Get profile by id' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async getProfileById(@Param('id') id: number) {
        this._logger.log('========== Get profile by id ==========');
        return await this._profileService.getProfileById(id);
    }
    
    @Get(URL_CONSTANTS.GET_DETAIL)
    @ApiOperation({ summary: 'Get profile detail by id' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async getProfileDetailById(@Param('id') id: number) {
        this._logger.log('========== Get profile detail by id ==========');
        return await this._profileService.getProfileDetailById(id);
    }
    
    @Put(URL_CONSTANTS.UPDATE)
    @ApiOperation({ summary: 'Update profile' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async updateProfile(@Param('id') id: number, @Body() request: UpdateProfileRequest) {
        this._logger.log('========== Update profile ==========');
        return await this._profileService.updateProfile(id, request);
    }
}