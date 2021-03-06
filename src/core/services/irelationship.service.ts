import { GetFriendListRequest } from "../dtos/requests/relationship/get-friend-list.request";
import { GetRelationshipRequest } from "../dtos/requests/relationship/get-relationship.request";
import { GetSuggestionsListRequest } from "../dtos/requests/relationship/get-suggestions-list.request";
import { ResponseDto } from "../dtos/responses/response.dto";
import { IBaseService } from "./ibase.service";

export interface IRelationshipService extends IBaseService {
    /**
    * getSuggestionsList
    * @param request
    */
    getSuggestionsList(request: GetSuggestionsListRequest): Promise<ResponseDto>;

    /**
    * getFriendList
    * @param request
    */
    getFriendList(request: GetFriendListRequest): Promise<ResponseDto>;

    /**
    * getRelationshipWithCurrentUser
    * @param request
    */
    getRelationshipWithCurrentUser(request: GetRelationshipRequest): Promise<ResponseDto>;
}