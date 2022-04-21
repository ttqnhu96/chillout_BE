import { GetSuggestionsListRequest } from "../dtos/requests/relationship/get-suggestions-list.request";
import { GetFriendListRequest } from "../dtos/requests/relationship/get-friend-list.request";
import { IBaseRepository } from "./ibase.repository";

export interface IRelationshipRepository extends IBaseRepository {
    /**
     * getSuggestionsList
     * @param request
     */
    getSuggestionsList(request: GetSuggestionsListRequest);

    /**
     * getFriendList
     * @param request
     */
    getFriendList(request: GetFriendListRequest);
}
