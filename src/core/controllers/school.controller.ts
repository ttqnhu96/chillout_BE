import { Body, Controller, Get, Inject, Logger, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { AuthUserInterceptor } from "../../interceptors/auth-user-interceptor.service";
import { CONTROLLER_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
import { CreateSchoolRequest } from "../dtos/requests/school/create-school.request";
import { ISchoolService } from "../services/ischool.service";

@Controller(CONTROLLER_CONSTANTS.SCHOOL)
@ApiTags(CONTROLLER_CONSTANTS.SCHOOL)
export class SchoolController {
    public readonly _logger = new Logger(SchoolController.name);
    constructor(@Inject(SERVICE_INTERFACE.ISCHOOL_SERVICE) private _schoolService: ISchoolService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get school list' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    async getSchoolList() {
        this._logger.log('========== Get school list ==========');
        return await this._schoolService.getSchoolList();
    }

    @Post()
    @ApiOperation({ summary: 'Create school' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async createSchool(@Body() request: CreateSchoolRequest) {
        this._logger.log('========== Create school ==========');
        return await this._schoolService.createSchool(request);
    }
}