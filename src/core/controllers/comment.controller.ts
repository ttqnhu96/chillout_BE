import { Body, Controller, Delete, Get, Inject, Logger, Param, Post, Put, UseGuards, UseInterceptors} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CONTROLLER_CONSTANTS, URL_CONSTANTS } from "../common/constants/api.constant";
import { SERVICE_INTERFACE } from "../config/module.config";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { AuthUserInterceptor } from "../../interceptors/auth-user-interceptor.service";
import { ICommentService } from "../services/icomment.service";
import { CreateCommentRequest } from "../dtos/requests/comment/create-comment.request";
import { UpdateCommentRequest } from "../dtos/requests/comment/update-comment.request";
import { GetCommentListByPostIdRequest } from "../dtos/requests/comment/get-comment-list-by-post-id.request";

@Controller(CONTROLLER_CONSTANTS.COMMENT)
@ApiTags(CONTROLLER_CONSTANTS.COMMENT)
export class CommentController {
    public readonly _logger = new Logger(CommentController.name);
    constructor(@Inject(SERVICE_INTERFACE.ICOMMENT_SERVICE) private _commentService: ICommentService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create comment' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async createComment(@Body() request: CreateCommentRequest) {
        this._logger.log('========== Create comment ==========');
        return await this._commentService.createComment(request);
    }

    @Put(URL_CONSTANTS.UPDATE)
    @ApiOperation({ summary: 'Update comment' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async updateComment(@Param('id') id: number, @Body() request: UpdateCommentRequest) {
        this._logger.log('========== Update comment ==========');
        return await this._commentService.updateComment(id, request);
    }

    @Get(URL_CONSTANTS.GET_BY_ID)
    @ApiOperation({ summary: 'Get comment by id' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async getCommentById(@Param('id') id: number) {
        this._logger.log('========== Get comment by id ==========');
        return await this._commentService.getCommentById(id);
    }

    @Delete(URL_CONSTANTS.DELETE)
    @ApiOperation({ summary: 'Delete comment' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async deleteCommentById(@Param('id') id: number) {
        this._logger.log('========== Delete comment ==========');
        return await this._commentService.deleteCommentById(id);
    }

    @Post(URL_CONSTANTS.GET_COMMENT_LIST_BY_POST_ID)
    @ApiOperation({ summary: 'Get comment list by post id' })
    @ApiResponse({ status: 200, description: 'The result returned is the ResponseDto class', schema: {} })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    public async getCommentListByPostId(@Body() request: GetCommentListByPostIdRequest) {
        this._logger.log('========== Get comment list by post id ==========');
        return await this._commentService.getCommentListByPostId(request);
    }
}