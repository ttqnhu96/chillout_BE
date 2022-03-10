import { ResponseDto } from "../dtos/response.dto";
import { IBaseService } from "./ibase.service";

export interface ICollegeService extends IBaseService {
    /**
     * getCollegeList
     * @param
     */
    getCollegeList(): Promise<ResponseDto>;
}