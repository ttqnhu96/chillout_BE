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

@Controller(CONTROLLER_CONSTANTS.POST)
@ApiTags(CONTROLLER_CONSTANTS.POST)
export class PostController {
    public readonly _logger = new Logger(PostController.name);
    constructor(@Inject(SERVICE_INTERFACE.IPOST_SERVICE) private _postService: IPostService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create post' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async createPost(@Body() request: CreatePostRequest) {
        this._logger.log('========== Create post ==========');
        return await this._postService.createPost(request);
    }

    @Put(URL_CONSTANTS.UPDATE)
    @ApiOperation({ summary: 'Update post' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async updatePost(@Param('id') id: number, @Body() request: UpdatePostRequest) {
        this._logger.log('========== Update post ==========');
        return await this._postService.updatePost(id, request);
    }

    @Put(URL_CONSTANTS.UPDATE_LIKES)
    @ApiOperation({ summary: 'Update likes' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async updateLikes(@Body() request: UpdateLikesRequest) {
        this._logger.log('========== Update likes ==========');
        return await this._postService.updateLikes(request);
    }

    @Get(URL_CONSTANTS.GET_BY_ID)
    @ApiOperation({ summary: 'Get post by id' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async getPostById(@Param('id') id: number) {
        this._logger.log('========== Get post by id ==========');
        return await this._postService.getPostById(id);
    }
    
    @Get(URL_CONSTANTS.GET_DETAIL)
    @ApiOperation({ summary: 'Get post detail by id' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async getPostDetailById(@Param('id') id: number) {
        this._logger.log('========== Get post detail by id ==========');
        return await this._postService.getPostDetailById(id);
    }

    @Delete(URL_CONSTANTS.DELETE)
    @ApiOperation({ summary: 'Delete post' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async deletePostById(@Param('id') id: number) {
        this._logger.log('========== Delete post ==========');
        return await this._postService.deletePostById(id);
    }

    @Post(URL_CONSTANTS.GET_POST_LIST_NEWS_FEED)
    @ApiOperation({ summary: 'Get post list in news feed' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async getPostListInNewsFeed(@Body() request: GetPostListNewsFeedRequest) {
        this._logger.log('========== Get post list in news feed ==========');
        return await this._postService.getPostListNewsFeed(request);
    }

    @Post(URL_CONSTANTS.GET_POST_LIST_WALL)
    @ApiOperation({ summary: 'Get post list in wall' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async getPostListWall(@Body() request: GetPostListWallRequest) {
        this._logger.log('========== Get post list in wall ==========');
        return await this._postService.getPostListWall(request);
    }

    @Post(URL_CONSTANTS.GET_LIST_USERS_LIKE_POST)
    @ApiOperation({ summary: 'Get list of users who liked post' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async getListUsersLikePost(@Body() request: GetListUsersLikePostRequest) {
        this._logger.log('========== Get list of users who liked post ==========');
        return await this._postService.getListUsersLikePost(request);
    }
}