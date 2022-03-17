import { Body, Controller, Get, Inject, Logger, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { AuthUserInterceptor } from "../../interceptors/auth-user-interceptor.service";
import { CONTROLLER_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
import { CreateCityRequest } from "../dtos/requests/city/create-city.request";
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

    @Post()
    @ApiOperation({ summary: 'Create city' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async createCity(@Body() request: CreateCityRequest) {
        this._logger.log('========== Create city ==========');
        return await this._cityService.createCity(request);
    }
}