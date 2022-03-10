import { ResponseDto } from "../dtos/responses/response.dto";
import { IBaseService } from "./ibase.service";

export interface IWorkplaceService extends IBaseService {
    /**
     * getWorkplaceList
     * @param
     */
     getWorkplaceList(): Promise<ResponseDto>;
}