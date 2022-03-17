import { CreateCollegeRequest } from "../dtos/requests/college/create-college.request";
import { ResponseDto } from "../dtos/responses/response.dto";
import { IBaseService } from "./ibase.service";

export interface ICollegeService extends IBaseService {
    /**
     * getCollegeList
     * @param
     */
    getCollegeList(): Promise<ResponseDto>;


    /**
    * createCollege
    * @param
    */
    createCollege(request: CreateCollegeRequest): Promise<ResponseDto>;
}