import { GetPhotoListByUserIdRequest } from "../dtos/requests/photo/get-photo-list-by-user-id.request";
import { ResponseDto } from "../dtos/responses/response.dto";
import { IBaseService } from "./ibase.service";

export interface IPhotoService extends IBaseService {
    /**
     * getPhotoListByUserId
     * @param request
     */
    getPhotoListByUserId(request: GetPhotoListByUserIdRequest): Promise<ResponseDto>;

    /**
     * deletePhotoById
     * @param id
     */
    deletePhotoById(id: number): Promise<ResponseDto>;

    /**
     * getPhotoById
     * @param id
     */
    getPhotoById(id: number): Promise<ResponseDto>;
}