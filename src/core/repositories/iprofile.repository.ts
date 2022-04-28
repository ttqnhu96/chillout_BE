import { SearchRequest } from "../dtos/requests/common/search.request";
import { IBaseRepository } from "./ibase.repository";

export interface IProfileRepository extends IBaseRepository {
    /**
     * getProfileDetailByUserId
     * @param userId
     */
    getProfileDetailByUserId(userId: number);

    /**
     * searchProfile
     * @param request
     */
    searchProfile(request: SearchRequest);
}
