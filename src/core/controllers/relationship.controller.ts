import { Body, Controller, Inject, Logger, Post, UseGuards, UseInterceptors} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CONTROLLER_CONSTANTS, URL_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { AuthUserInterceptor } from "../../interceptors/auth-user-interceptor.service";
import { IRelationshipService } from "../services/irelationship.service";
import { GetSuggestionsListRequest } from "../dtos/requests/relationship/get-suggestions-list.request";
import { GetFriendListRequest } from "../dtos/requests/relationship/get-friend-list.request";

@Controller(CONTROLLER_CONSTANTS.RELATIONSHIP)
@ApiTags(CONTROLLER_CONSTANTS.RELATIONSHIP)
export class RelationshipController {
    public readonly _logger = new Logger(RelationshipController.name);
    constructor(@Inject(SERVICE_INTERFACE.IRELATIONSHIP_SERVICE) private _relationshipService: IRelationshipService
    ) { }

    @Post(URL_CONSTANTS.GET_SUGGESTIONS_LIST)
    @ApiOperation({ summary: 'Get suggestions list' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async getSuggestionsList(@Body() request: GetSuggestionsListRequest) {
        this._logger.log('========== Get suggestions list ==========');
        return await this._relationshipService.getSuggestionsList(request);
    }

    @Post(URL_CONSTANTS.GET_FRIEND_LIST)
    @ApiOperation({ summary: 'Get friend list' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async getFriendList(@Body() request: GetFriendListRequest) {
        this._logger.log('========== Get friend list ==========');
        return await this._relationshipService.getFriendList(request);
    }
}