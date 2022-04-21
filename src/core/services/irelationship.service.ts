import { GetSuggestionsListRequest } from "../dtos/requests/relationship/get-suggestions-list.request";
import { ResponseDto } from "../dtos/responses/response.dto";
import { IBaseService } from "./ibase.service";

export interface IRelationshipService extends IBaseService {
    /**
    * getSuggestionsList
    * @param request
    */
    getSuggestionsList(request: GetSuggestionsListRequest): Promise<ResponseDto>;
}