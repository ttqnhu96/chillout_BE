import { ResponseDto } from "../dtos/responses/response.dto";
import { IBaseService } from "./ibase.service";

export interface ICityService extends IBaseService {
    /**
     * getCityList
     * @param
     */
    getCityList(): Promise<ResponseDto>;
}