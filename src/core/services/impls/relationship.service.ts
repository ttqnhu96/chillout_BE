import { Inject, Injectable, Logger } from "@nestjs/common";
import { ErrorMap } from "../../common/error.map";
import { REPOSITORY_INTERFACE } from "../../config/module.config";
import { ResponseDto } from "../../dtos/responses/response.dto";
import { BaseService } from "./base.service";
import { CommonUtil } from "../../utils/common.util";
import { IRelationshipService } from "../irelationship.service";
import { IRelationshipRepository } from "../../repositories/irelationship.repository";
import { GetSuggestionsListRequest } from "../../dtos/requests/relationship/get-suggestions-list.request";

@Injectable()
export class RelationshipService extends BaseService implements IRelationshipService {
    private readonly _logger = new Logger(RelationshipService.name);
    private _commonUtil: CommonUtil = new CommonUtil();
    constructor(@Inject(REPOSITORY_INTERFACE.IRELATIONSHIP_REPOSITORY) private _relationshipRepos: IRelationshipRepository) {
        super(_relationshipRepos);
        this._logger.log("============== Constructor RelationshipService ==============");
    }

    /**
    * getSuggestionsList
    * @param request
    */
    async getSuggestionsList(request: GetSuggestionsListRequest): Promise<ResponseDto> {
        this._logger.log("============== Get suggestions list ==============");
        const res = new ResponseDto();
        try {
            const suggestionList = await this._relationshipRepos.getSuggestionsList(request);
            return res.return(ErrorMap.SUCCESSFUL.Code, suggestionList);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }
}