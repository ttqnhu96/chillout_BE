import { Body, Controller, Get, Inject, Logger, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { AuthUserInterceptor } from "../../interceptors/auth-user-interceptor.service";
import { CONTROLLER_CONSTANTS, URL_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
import { SearchRequest } from "../dtos/requests/common/search.request";
import { ICommonService } from "../services/icommon.service";

@Controller(CONTROLLER_CONSTANTS.COMMON)
@ApiTags(CONTROLLER_CONSTANTS.COMMON)
export class CommonController {
    public readonly _logger = new Logger(CommonController.name);
    constructor(@Inject(SERVICE_INTERFACE.ICOMMON_SERVICE) private _commonService: ICommonService
    ) { }

    @Post(URL_CONSTANTS.SEARCH)
    @ApiOperation({ summary: 'Search all' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async getCommentListByPostId(@Body() request: SearchRequest) {
        this._logger.log('========== Search all ==========');
        return await this._commonService.searchAll(request);
    }
}