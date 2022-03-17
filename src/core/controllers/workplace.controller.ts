import { Body, Controller, Get, Inject, Logger, Post, UseGuards, UseInterceptors} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { AuthUserInterceptor } from "../../interceptors/auth-user-interceptor.service";
import { CONTROLLER_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
import { CreateWorkplaceRequest } from "../dtos/requests/workplace/create-workplace.request";
import { IWorkplaceService } from "../services/iworkplace.service";

@Controller(CONTROLLER_CONSTANTS.WORKPLACE)
@ApiTags(CONTROLLER_CONSTANTS.WORKPLACE)
export class WorkplaceController {
    public readonly _logger = new Logger(WorkplaceController.name);
    constructor(@Inject(SERVICE_INTERFACE.IWORKPLACE_SERVICE) private _workplaceService: IWorkplaceService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get workplace list' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    async getWorkplaceList() {
        this._logger.log('========== Get workplace list ==========');
        return await this._workplaceService.getWorkplaceList();
    }

    @Post()
    @ApiOperation({ summary: 'Create workplace' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async createSchool(@Body() request: CreateWorkplaceRequest) {
        this._logger.log('========== Create workplace ==========');
        return await this._workplaceService.createWorkplace(request);
    }
}