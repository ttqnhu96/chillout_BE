import { Controller, Get, Inject, Logger} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CONTROLLER_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
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
}