import { CreateFriendRequestRequest } from "../dtos/requests/friend-request/create-friend-request.request";
import { GetReceivedFriendRequestListRequest } from "../dtos/requests/friend-request/get-received-friend-request-list.request";
import { ResponseDto } from "../dtos/responses/response.dto";
import { IBaseService } from "./ibase.service";

export interface IFriendRequestService extends IBaseService {
    /**
    * createFriendRequest
    * @param request
    */
    createFriendRequest(request: CreateFriendRequestRequest): Promise<ResponseDto>;

    /**
     * getFriendRequestListByReceiverId
     * @param request
     */
    getReceivedFriendRequestList(request: GetReceivedFriendRequestListRequest): Promise<ResponseDto>;
}