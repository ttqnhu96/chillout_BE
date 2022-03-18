import { SearchRequest } from "../dtos/requests/common/search.request";
import { IBaseRepository } from "./ibase.repository";

export interface IProfileRepository extends IBaseRepository {
    /**
     * getProfileDetailById
     * @param id
     */
    getProfileDetailById(id: number);

    /**
     * searchProfile
     * @param request 
     */
    searchProfile(request: SearchRequest);
}
