import { CreateWorkplaceRequest } from "../dtos/requests/workplace/create-workplace.request";
import { ResponseDto } from "../dtos/responses/response.dto";
import { IBaseService } from "./ibase.service";

export interface IWorkplaceService extends IBaseService {
    /**
     * getWorkplaceList
     * @param
     */
     getWorkplaceList(): Promise<ResponseDto>;

    /**
    * createWorkplace
    * @param
    */
    createWorkplace(request: CreateWorkplaceRequest): Promise<ResponseDto>;
}