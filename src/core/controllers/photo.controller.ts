import { Body, Controller, Delete, Get, Inject, Logger, Param, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { AuthUserInterceptor } from "../../interceptors/auth-user-interceptor.service";
import { CONTROLLER_CONSTANTS, URL_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
import { GetPhotoListByUserIdRequest } from "../dtos/requests/photo/get-photo-list-by-user-id.request";
import { IPhotoService } from "../services/iphoto.service";

@Controller(CONTROLLER_CONSTANTS.PHOTO)
@ApiTags(CONTROLLER_CONSTANTS.PHOTO)
export class PhotoController {
    public readonly _logger = new Logger(PhotoController.name);
    constructor(@Inject(SERVICE_INTERFACE.IPHOTO_SERVICE) private _photoService: IPhotoService
    ) { }

    @Post(URL_CONSTANTS.GET_PHOTO_LIST_BY_USER_ID)
    @ApiOperation({ summary: 'Get photo list by user id' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    async getPhotoListByUserId(@Body() request: GetPhotoListByUserIdRequest) {
        this._logger.log('========== Get photo list by user id ==========');
        return await this._photoService.getPhotoListByUserId(request);
    }

    @Delete(URL_CONSTANTS.DELETE)
    @ApiOperation({ summary: 'Delete photo' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async deletePostById(@Param('id') id: number) {
        this._logger.log('========== Delete photo ==========');
        return await this._photoService.deletePhotoById(id);
    }

    @Get(URL_CONSTANTS.GET_BY_ID)
    @ApiOperation({ summary: 'Get photo by id' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async getPhotoById(@Param('id') id: number) {
        this._logger.log('========== Get photo by id ==========');
        return await this._photoService.getPhotoById(id);
    }
}