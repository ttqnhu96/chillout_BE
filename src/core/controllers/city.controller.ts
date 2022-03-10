import { Controller, Get, Inject, Logger, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CONTROLLER_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
import { ICityService } from "../services/icity.service";

@Controller(CONTROLLER_CONSTANTS.CITY)
@ApiTags(CONTROLLER_CONSTANTS.CITY)
export class CityController {
    public readonly _logger = new Logger(CityController.name);
    constructor(@Inject(SERVICE_INTERFACE.ICITY_SERVICE) private _cityService: ICityService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get city list' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    async getCityList() {
        this._logger.log('========== Get city list ==========');
        return await this._cityService.getCityList();
    }
}