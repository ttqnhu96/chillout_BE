import { ResponseDto } from "../dtos/response.dto";
import { IBaseService } from "./ibase.service";

export interface ISchoolService extends IBaseService {
    /**
     * getSchoolList
     * @param
     */
     getSchoolList(): Promise<ResponseDto>;
}