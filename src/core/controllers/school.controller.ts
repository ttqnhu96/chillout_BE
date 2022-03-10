import { Controller, Get, Inject, Logger } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CONTROLLER_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
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
}