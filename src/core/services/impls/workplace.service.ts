import { Inject, Injectable, Logger } from "@nestjs/common";
import { ORDER_BY } from "../../common/constants/common.constant";
import { ErrorMap } from "../../common/error.map";
import { REPOSITORY_INTERFACE } from "../../config/module.config";
import { ResponseDto } from "../../dtos/responses/response.dto";
import { BaseService } from "./base.service";
import { IWorkplaceService } from "../iworkplace.service";
import { IWorkplaceRepository } from "../../repositories/iworkplace.repository";
import { CreateWorkplaceRequest } from "../../dtos/requests/workplace/create-workplace.request";
import { AutoMapperUtil } from "../../utils/auto-mapper/auto-mapper.util";
import { MAPPER_CONFIG } from "../../config/mapper.config";

@Injectable()
export class WorkplaceService extends BaseService implements IWorkplaceService {
    private readonly _logger = new Logger(WorkplaceService.name);
    constructor(@Inject(REPOSITORY_INTERFACE.IWORKPLACE_REPOSITORY) private _workplaceRepos: IWorkplaceRepository) {
        super(_workplaceRepos);
        this._logger.log("============== Constructor WorkplaceService ==============");
    }

    /**
     * getWorkplaceList
     * @param
     */
    async getWorkplaceList(): Promise<ResponseDto> {
        this._logger.log("============== Get workplace list ==============");
        const res = new ResponseDto();
        try {
            //get active workplace list
            const listWorkplace = await this._workplaceRepos.findByCondition(
                { isActive: true },
                { id: ORDER_BY.ASC });

            return res.return(ErrorMap.SUCCESSFUL.Code, listWorkplace);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * createWorkplace
     * @param request
     */
    async createWorkplace(request: CreateWorkplaceRequest): Promise<ResponseDto> {
        this._logger.log("============== Create workplace ==============");
        const res = new ResponseDto();
        try {
            //Save to School table
            const dataMapper = AutoMapperUtil.map(MAPPER_CONFIG.CREATE_WORKPLACE_MAPPING, request);
            dataMapper.isActive = true;
            const workplace = await this._workplaceRepos.create(dataMapper);
            return res.return(ErrorMap.SUCCESSFUL.Code, workplace);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }
}