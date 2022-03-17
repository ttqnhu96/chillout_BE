import { Body, Controller, Get, Inject, Logger, Post, UseGuards, UseInterceptors} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { AuthUserInterceptor } from "../../interceptors/auth-user-interceptor.service";
import { CONTROLLER_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
import { CreateSchoolRequest } from "../dtos/requests/school/create-school.request";
import { ICollegeService } from "../services/icollege.service";

@Controller(CONTROLLER_CONSTANTS.COLLEGE)
@ApiTags(CONTROLLER_CONSTANTS.COLLEGE)
export class CollegeController {
    public readonly _logger = new Logger(CollegeController.name);
    constructor(@Inject(SERVICE_INTERFACE.ICOLLEGE_SERVICE) private _collegeService: ICollegeService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get college list' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    async getCollegeList() {
        this._logger.log('========== Get college list ==========');
        return await this._collegeService.getCollegeList();
    }

    @Post()
    @ApiOperation({ summary: 'Create college' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async createSchool(@Body() request: CreateSchoolRequest) {
        this._logger.log('========== Create college ==========');
        return await this._collegeService.createCollege(request);
    }
}