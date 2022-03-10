import { ResponseDto } from "../dtos/responses/response.dto";
import { IBaseService } from "./ibase.service";

export interface ISchoolService extends IBaseService {
    /**
     * getSchoolList
     * @param
     */
     getSchoolList(): Promise<ResponseDto>;
}