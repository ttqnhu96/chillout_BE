import { Controller, Get, Inject, Logger} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CONTROLLER_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
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
}