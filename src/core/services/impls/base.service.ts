import { Logger } from "@nestjs/common";
import { ErrorMap } from "src/core/common/error.map";
import { ResponseDto } from "src/core/dtos/response.dto";
import { IBaseService } from "../ibase.service";

export class BaseService implements IBaseService {
    private _repos: any;
    //private _log = new Logger(BaseService.name);
    public constructor(repos: any) {
        this._repos = repos;
    }

    /**
     * findOne
     * @param condition 
     * @returns 
     */
    public async findOne(id: any): Promise<ResponseDto> {
        const response = new ResponseDto();
        const result = await this._repos.findOne(id);
        return response.return(ErrorMap.SUCCESSFUL.Code, result);
    }

    /**
     * findByCondition
     * @param condition 
     * @param orderBy 
     * @returns 
     */
    public async findByCondition(condition: any, orderBy: any = null): Promise<ResponseDto> {
        const response = new ResponseDto();
        const result = await this._repos.findByCondition(condition, orderBy);
        return response.return(ErrorMap.SUCCESSFUL.Code, result);
    }

    /**
     * findAll
     * @param orderBy 
     * @returns 
     */
    public async findAll(orderBy?: any): Promise<ResponseDto> {
        const response = new ResponseDto();
        const result = await this._repos.findAll(orderBy);
        return response.return(ErrorMap.SUCCESSFUL.Code, result);
    }
}