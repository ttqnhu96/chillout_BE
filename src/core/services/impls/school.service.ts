import { Inject, Injectable, Logger } from "@nestjs/common";
import { ORDER_BY } from "../../common/constants/common.constant";
import { ErrorMap } from "../../common/error.map";
import { REPOSITORY_INTERFACE } from "../../config/module.config";
import { ISchoolRepository } from "../../repositories/ischool.repository";
import { ResponseDto } from "../../dtos/responses/response.dto";
import { BaseService } from "./base.service";
import { ISchoolService } from "../ischool.service";
import { CreateSchoolRequest } from "../../dtos/requests/school/create-school.request";
import { MAPPER_CONFIG } from "../../config/mapper.config";
import { AutoMapperUtil } from "../../utils/auto-mapper/auto-mapper.util";

@Injectable()
export class SchoolService extends BaseService implements ISchoolService {
    private readonly _logger = new Logger(SchoolService.name);
    constructor(@Inject(REPOSITORY_INTERFACE.ISCHOOL_REPOSITORY) private _schoolRepos: ISchoolRepository){
        super(_schoolRepos);
        this._logger.log("============== Constructor SchoolService ==============");
    }

    /**
     * getSchoolList
     * @param
     */
    async getSchoolList(): Promise<ResponseDto> {
        this._logger.log("============== Get school list ==============");
        const res = new ResponseDto();
        try {
            //get active school list
            const listSchool = await this._schoolRepos.findByCondition(
            { isActive: true },
            { id: ORDER_BY.ASC });

            return res.return(ErrorMap.SUCCESSFUL.Code, listSchool);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * createSchool
     * @param request
     */
    async createSchool(request: CreateSchoolRequest): Promise<ResponseDto> {
        this._logger.log("============== Create school ==============");
        const res = new ResponseDto();
        try {
            //Save to School table
            const dataMapper = AutoMapperUtil.map(MAPPER_CONFIG.CREATE_SCHOOL_MAPPING, request);
            dataMapper.isActive = true;
            const school = await this._schoolRepos.create(dataMapper);
            return res.return(ErrorMap.SUCCESSFUL.Code, school);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }
}