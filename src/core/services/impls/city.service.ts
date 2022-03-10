import { Inject, Injectable, Logger } from "@nestjs/common";
import { ORDER_BY } from "../../common/constants/common.constant";
import { ErrorMap } from "../../common/error.map";
import { REPOSITORY_INTERFACE } from "../../config/module.config";
import { ICityRepository } from "../../repositories/icity.repository";
import { ResponseDto } from "../../../core/dtos/response.dto";
import { ICityService } from "../icity.service";
import { BaseService } from "./base.service";

@Injectable()
export class CityService extends BaseService implements ICityService {
    private readonly _logger = new Logger(CityService.name);
    constructor(@Inject(REPOSITORY_INTERFACE.ICITY_REPOSITORY) private _cityRepos: ICityRepository){
        super(_cityRepos);
        this._logger.log("============== Constructor CityService ==============");
    }

    /**
     * getCityList
     * @param
     */
    async getCityList(): Promise<ResponseDto> {
        this._logger.log("============== Get city list ==============");
        const res = new ResponseDto();
        try {
            //get active city list
            const listCity = await this._cityRepos.findByCondition(
            { isActive: true },
            { id: ORDER_BY.ASC });

            return res.return(ErrorMap.SUCCESSFUL.Code, listCity);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }
}