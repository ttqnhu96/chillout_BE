import { Inject, Injectable, Logger } from "@nestjs/common";
import { ErrorMap } from "../../common/error.map";
import { REPOSITORY_INTERFACE } from "../../config/module.config";
import { ResponseDto } from "../../dtos/responses/response.dto";
import { BaseService } from "./base.service";
import { CommonUtil } from "../../utils/common.util";
import { IPostService } from "../ipost.service";
import { IPostRepository } from "../../repositories/ipost.repository";
import { CreatePostRequest } from "../../dtos/requests/post/create-post.request";
import { AutoMapperUtil } from "../../utils/auto-mapper/auto-mapper.util";
import { MAPPER_CONFIG } from "../../config/mapper.config";
import { PhotoEntity } from "../../entities/photo.entity";
import { IPhotoRepository } from "../../repositories/iphoto.repository";
import { UpdatePostRequest } from "../../dtos/requests/post/update-post.request";
import { UpdateLikesRequest } from "../../dtos/requests/post/like-post.request";

@Injectable()
export class PostService extends BaseService implements IPostService {
    private readonly _logger = new Logger(PostService.name);
    private _commonUtil: CommonUtil = new CommonUtil();
    constructor(@Inject(REPOSITORY_INTERFACE.IPOST_REPOSITORY) private _postRepos: IPostRepository,
        @Inject(REPOSITORY_INTERFACE.IPHOTO_REPOSITORY) private _photoRepos: IPhotoRepository) {
        super(_postRepos);
        this._logger.log("============== Constructor PostService ==============");
    }

    /**
     * createPost
     * @param request
     */
    async createPost(request: CreatePostRequest): Promise<ResponseDto> {
        this._logger.log("============== Create post ==============");
        const res = new ResponseDto();
        try {
            //Save to Post table
            const dataMapper = AutoMapperUtil.map(MAPPER_CONFIG.CREATE_POST_MAPPING, request);
            const currentUserId = await this._commonUtil.getUserId();
            dataMapper.userId = currentUserId;
            dataMapper.likes = 0;
            dataMapper.isDeleted = false;
            const post = await this._postRepos.create(dataMapper);
            const postId = post.id;

            //Save to Photo table
            request.photoList.map(async item => {
                const photo = new PhotoEntity;
                photo.fileName = item;
                photo.postId = postId;
                photo.isDeleted = false;
                return await this._photoRepos.create(photo);
            })

            return res.return(ErrorMap.SUCCESSFUL.Code, post);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * updatePost
     * @param id
     * @param request
     */
    async updatePost(id: number, request: UpdatePostRequest): Promise<ResponseDto> {
        this._logger.log("============== Update post ==============");
        const res = new ResponseDto();
        try {
            // Check post existence
            const checkedPost = await this._postRepos.findOne(id);
            if (!checkedPost) {
                return res.return(ErrorMap.E009.Code);
            }

            // Check update permission
            const currentUserId = await this._commonUtil.getUserId();
            if (currentUserId !== checkedPost.userId) {
                return res.return(ErrorMap.E010.Code);
            }

            //Save to Post table
            const dataMapper = AutoMapperUtil.map(MAPPER_CONFIG.UPDATE_POST_MAPPING, request);
            dataMapper.id = id;
            const post = await this._postRepos.update(dataMapper);

            //Save to Photo table
            const photoList = request.photoList;
            //Delete old photos
            const photoListDelete = photoList.filter(i => i.id > 0 && i.isDeleted === true);
            photoListDelete.map(async item => {
                const photo = await this._photoRepos.findOne({
                    id: item.id,
                    postId: id,
                    isDeleted: false
                });
                if (photo) {
                    photo.isDeleted = true;
                    await this._photoRepos.update(photo);
                }
            })
            //Insert new photo
            const photoListInsert = photoList.filter(i => i.id === 0);
            photoListInsert.map(async item => {
                const photo = new PhotoEntity;
                photo.fileName = item.fileName;
                photo.postId = id;
                photo.isDeleted = item.isDeleted;
                return await this._photoRepos.create(photo);
            })

            return res.return(ErrorMap.SUCCESSFUL.Code, post);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * updateLikes
     * @param request
     */
    async updateLikes(request: UpdateLikesRequest): Promise<ResponseDto> {
        this._logger.log("============== Like/unlike post ==============");
        const res = new ResponseDto();
        try {
            // Check post existence
            const post = await this._postRepos.findOne(request.postId);
            if (!post) {
                return res.return(ErrorMap.E009.Code);
            }
            //Update likes
            post.likes = request.isLike ? (post.likes + 1) : (post.likes - 1);
            await this._postRepos.create(post);
            return res.return(ErrorMap.SUCCESSFUL.Code, post);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }
}