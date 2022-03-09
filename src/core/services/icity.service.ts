import { ResponseDto } from "../dtos/response.dto";
import { IBaseService } from "./ibase.service";

export interface ICityService extends IBaseService {
    /**
     * getCityList
     * @param
     */
    getCityList(): Promise<ResponseDto>;
}