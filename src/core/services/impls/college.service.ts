import { Inject, Injectable, Logger } from "@nestjs/common";
import { ORDER_BY } from "../../common/constants/common.constant";
import { ErrorMap } from "../../common/error.map";
import { REPOSITORY_INTERFACE } from "../../config/module.config";
import { ICityRepository } from "../../repositories/icity.repository";
import { ResponseDto } from "../../dtos/responses/response.dto";
import { BaseService } from "./base.service";
import { ICollegeService } from "../icollege.service";
import { ICollegeRepository } from "../../repositories/icollege.repository";
import { CreateCollegeRequest } from "../../dtos/requests/college/create-college.request";
import { AutoMapperUtil } from "../../utils/auto-mapper/auto-mapper.util";
import { MAPPER_CONFIG } from "../../config/mapper.config";

@Injectable()
export class CollegeService extends BaseService implements ICollegeService {
    private readonly _logger = new Logger(CollegeService.name);
    constructor(@Inject(REPOSITORY_INTERFACE.ICOLLEGE_REPOSITORY) private _collegeRepos: ICollegeRepository){
        super(_collegeRepos);
        this._logger.log("============== Constructor CollegeService ==============");
    }

    /**
     * getCollegeList
     * @param
     */
    async getCollegeList(): Promise<ResponseDto> {
        this._logger.log("============== Get college list ==============");
        const res = new ResponseDto();
        try {
            //get active college list
            const listCollege = await this._collegeRepos.findByCondition(
            { isActive: true },
            { id: ORDER_BY.ASC });

            return res.return(ErrorMap.SUCCESSFUL.Code, listCollege);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * createCollege
     * @param request
     */
    async createCollege(request: CreateCollegeRequest): Promise<ResponseDto> {
        this._logger.log("============== Create college ==============");
        const res = new ResponseDto();
        try {
            //Save to College table
            const dataMapper = AutoMapperUtil.map(MAPPER_CONFIG.CREATE_COLLEGE_MAPPING, request);
            dataMapper.isActive = true;
            const college = await this._collegeRepos.create(dataMapper);
            return res.return(ErrorMap.SUCCESSFUL.Code, college);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }
}