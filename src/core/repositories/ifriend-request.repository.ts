import { GetReceivedFriendRequestListRequest } from "../dtos/requests/friend-request/get-received-friend-request-list.request";
import { IBaseRepository } from "./ibase.repository";

export interface IFriendRequestRepository extends IBaseRepository {
    /**
     * getReceivedFriendRequestList
     * @param request
     */
    getReceivedFriendRequestList(request: GetReceivedFriendRequestListRequest);
}
