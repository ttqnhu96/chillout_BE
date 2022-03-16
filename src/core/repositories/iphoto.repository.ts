import { GetPhotoListByUserIdRequest } from "../dtos/requests/photo/get-photo-list-by-user-id.request";
import { IBaseRepository } from "./ibase.repository";

export interface IPhotoRepository extends IBaseRepository {
    /**
     * getPhotoListByUserId
     * @param request
     */
    getPhotoListByUserId(request: GetPhotoListByUserIdRequest)
}
