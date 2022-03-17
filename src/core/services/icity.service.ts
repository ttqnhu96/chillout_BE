import { CreateCityRequest } from "../dtos/requests/city/create-city.request";
import { ResponseDto } from "../dtos/responses/response.dto";
import { IBaseService } from "./ibase.service";

export interface ICityService extends IBaseService {
    /**
     * getCityList
     * @param
     */
    getCityList(): Promise<ResponseDto>;

    /**
    * createCity
    * @param
    */
    createCity(request: CreateCityRequest): Promise<ResponseDto>;
}