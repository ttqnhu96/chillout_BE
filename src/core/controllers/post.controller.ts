import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Logger, Param, Post, Put, UseGuards, UseInterceptors} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CONTROLLER_CONSTANTS, URL_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { AuthUserInterceptor } from "../../interceptors/auth-user-interceptor.service";
import { IPostService } from "../services/ipost.service";
import { CreatePostRequest } from "../dtos/requests/post/create-post.request";
import { UpdatePostRequest } from "../dtos/requests/post/update-post.request";
import { UpdateLikesRequest } from "../dtos/requests/post/like-post.request";

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
}