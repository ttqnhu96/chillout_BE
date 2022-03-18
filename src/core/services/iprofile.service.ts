import { SearchRequest } from "../dtos/requests/common/search.request";
import { UpdateAvatarRequest } from "../dtos/requests/profile/update-avatar.request";
import { UpdateProfileRequest } from "../dtos/requests/profile/update-profile.request";
import { ResponseDto } from "../dtos/responses/response.dto";
import { IBaseService } from "./ibase.service";

export interface IProfileService extends IBaseService {
    /**
     * getProfileById
     * @param username
     */
    getProfileById(id: number): Promise<ResponseDto>;

    /**
     * getProfileById
     * @param id
     */
    getProfileById(id: number): Promise<ResponseDto>;

    /**
     * getProfileDetailById
     * @param id
     */
    getProfileDetailById(id: number): Promise<ResponseDto>;

    /**
     * updateProfile
     * @param id
     * @param request
     */
    updateProfile(id: number, request: UpdateProfileRequest): Promise<ResponseDto>;

    /**
     * updateAvatar
     * @param request
     */
    updateAvatar(request: UpdateAvatarRequest): Promise<any>;

    /**
     * searchProfile
     * @param request 
     */
     searchProfile(request: SearchRequest): Promise<any>;
}