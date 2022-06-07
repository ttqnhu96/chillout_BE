import { Inject, Injectable, Logger } from "@nestjs/common";
import { ErrorMap } from "../../common/error.map";
import { REPOSITORY_INTERFACE } from "../../config/module.config";
import { ResponseDto } from "../../dtos/responses/response.dto";
import { BaseService } from "./base.service";
import { CommonUtil } from "../../utils/common.util";
import { IPostRepository } from "../../repositories/ipost.repository";
import { AutoMapperUtil } from "../../utils/auto-mapper/auto-mapper.util";
import { MAPPER_CONFIG } from "../../config/mapper.config";
import { ICommentRepository } from "../../repositories/icomment.repository";
import {PRIVACY_SETTING } from "../../common/constants/common.constant";
import { ICommentService } from "../icomment.service";
import { CreateCommentRequest } from "../../dtos/requests/comment/create-comment.request";
import { UpdateCommentRequest } from "../../dtos/requests/comment/update-comment.request";
import { GetCommentListByPostIdRequest } from "../../dtos/requests/comment/get-comment-list-by-post-id.request";
import { PaginatorResponse } from "../../dtos/responses/paginator-response.dto";

@Injectable()
export class CommentService extends BaseService implements ICommentService {
    private readonly _logger = new Logger(CommentService.name);
    private _commonUtil: CommonUtil = new CommonUtil();
    constructor(@Inject(REPOSITORY_INTERFACE.ICOMMENT_REPOSITORY) private _commentRepos: ICommentRepository,
        @Inject(REPOSITORY_INTERFACE.IPOST_REPOSITORY) private _postRepos: IPostRepository) {
        super(_commentRepos);
        this._logger.log("============== Constructor CommentService ==============");
    }

    /**
     * createComment
     * @param request
     */
    async createComment(request: CreateCommentRequest): Promise<ResponseDto> {
        this._logger.log("============== Create comment ==============");
        const res = new ResponseDto();
        try {
            //Save to Comment table
            const dataMapper = AutoMapperUtil.map(MAPPER_CONFIG.CREATE_COMMENT_MAPPING, request);
            const currentUserId = await this._commonUtil.getUserId();
            dataMapper.userId = currentUserId;
            dataMapper.isDeleted = false;
            const comment = await this._commentRepos.create(dataMapper);

            const post = await this._postRepos.findOne(comment.postId);
            comment['postAuthorId'] = post.userId;

            return res.return(ErrorMap.SUCCESSFUL.Code, comment);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * updateComment
     * @param id
     * @param request
     */
    async updateComment(id: number, request: UpdateCommentRequest): Promise<ResponseDto> {
        this._logger.log("============== Update comment ==============");
        const res = new ResponseDto();
        try {
            // Check comment existence
            const currentUserId = await this._commonUtil.getUserId();
            const checkedComment = await this._commentRepos.findOne({
                id: id,
                userId: currentUserId,
                isDeleted: false
            });
            if (!checkedComment) {
                return res.return(ErrorMap.E011.Code);
            }

            //Save to Comment table
            const dataMapper = AutoMapperUtil.map(MAPPER_CONFIG.UPDATE_COMMENT_MAPPING, request);
            dataMapper.id = id;
            await this._commentRepos.update(dataMapper);
            
            // Get comment detail by id
            const comment = await this._commentRepos.findOne({
                id: id,
                isDeleted: false
            });

            return res.return(ErrorMap.SUCCESSFUL.Code, comment);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * getCommentById
     * @param id
     */
    async getCommentById(id: number): Promise<ResponseDto> {
        this._logger.log("============== Get comment by id ==============");
        const res = new ResponseDto();
        try {
            // Get comment by id
            const comment = await this._commentRepos.findOne({
                id: id,
                isDeleted: false
            });
            if (!comment) {
                return res.return(ErrorMap.E011.Code);
            }

            //Get post containing comment
            const post = await this._postRepos.findOne({
                id: comment.postId,
                isDeleted: false
            });
            if (!post) {
                return res.return(ErrorMap.E009.Code);
            }

            //Check permission to view post and comment
            const currentUserId = await this._commonUtil.getUserId();
            const cannotAccessPostOnlyMe = post.privacySettingId === PRIVACY_SETTING.ONLY_ME && currentUserId !== post.userId;
            if (cannotAccessPostOnlyMe) {
                return res.return(ErrorMap.E009.Code);
            }

            return res.return(ErrorMap.SUCCESSFUL.Code, comment);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * deleteCommentById
     * @param id
     */
    async deleteCommentById(id: number): Promise<ResponseDto> {
        this._logger.log("============== Delete comment by id ==============");
        const res = new ResponseDto();
        try {
            //Check comment existence
            const currentUserId = await this._commonUtil.getUserId();
            const comment = await this._commentRepos.findOne({
                id: id,
                // userId: currentUserId,
                isDeleted: false
            });

            if (!comment) {
                return res.return(ErrorMap.E011.Code);
            }

            //Delete comment
            comment.isDeleted = true;
            await this._commentRepos.update(comment);

            return res.return(ErrorMap.SUCCESSFUL.Code, comment);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * getCommentListByPostId
     * @param request
     */
    async getCommentListByPostId(request: GetCommentListByPostIdRequest): Promise<ResponseDto> {
        this._logger.log("============== Get comment list by post id ==============");
        const res = new ResponseDto();
        try {
            let pageDto = new PaginatorResponse;
            const result = await this._commentRepos.getCommentListByPostId(request);
            pageDto.pageResults = result[0];
            pageDto.totalRecord = result[1][0].Total;
            pageDto.pageIndex = request.pageIndex;
            pageDto.pageSize = request.pageSize;
            
            return res.return(ErrorMap.SUCCESSFUL.Code, pageDto);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }
}