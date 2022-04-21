import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Logger, Param, Post, Put, UseGuards, UseInterceptors} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CONTROLLER_CONSTANTS, URL_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { AuthUserInterceptor } from "../../interceptors/auth-user-interceptor.service";
import { IPostService } from "../services/ipost.service";
import { CreatePostRequest } from "../dtos/requests/post/create-post.request";
import { UpdatePostRequest } from "../dtos/requests/post/update-post.request";
import { UpdateLikesRequest } from "../dtos/requests/post/like-post.request";
import { GetPostListNewsFeedRequest } from "../dtos/requests/post/get-post-list-news-feed.request";
import { GetPostListWallRequest } from "../dtos/requests/post/get-post-list-wall.request";
import { GetListUsersLikePostRequest } from "../dtos/requests/post/get-list-users-like-post.request";
import { SearchRequest } from "../dtos/requests/common/search.request";
import { IRelationshipService } from "../services/irelationship.service";
import { GetSuggestionsListRequest } from "../dtos/requests/relationship/get-suggestions-list.request";

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
}