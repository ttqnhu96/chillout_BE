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
import { ORDER_BY, PRIVACY_SETTING } from "../../common/constants/common.constant";
import { GetPostListNewsFeedRequest } from "../../dtos/requests/post/get-post-list-news-feed.request";
import { GetPostListWallRequest } from "../../dtos/requests/post/get-post-list-wall.request";
import { ICommentRepository } from "../../repositories/icomment.repository";
import { GetListUsersLikePostRequest } from "../../dtos/requests/post/get-list-users-like-post.request";
import { IPostLikedUsersRepository } from "../../repositories/ipost-liked-users.repository";
import { PostLikedUsersEntity } from "../../entities/post-liked-users.entity";

@Injectable()
export class PostService extends BaseService implements IPostService {
    private readonly _logger = new Logger(PostService.name);
    private _commonUtil: CommonUtil = new CommonUtil();
    constructor(@Inject(REPOSITORY_INTERFACE.IPOST_REPOSITORY) private _postRepos: IPostRepository,
        @Inject(REPOSITORY_INTERFACE.IPHOTO_REPOSITORY) private _photoRepos: IPhotoRepository,
        @Inject(REPOSITORY_INTERFACE.ICOMMENT_REPOSITORY) private _commentRepos: ICommentRepository,
        @Inject(REPOSITORY_INTERFACE.IPOST_LIKED_USERS_REPOSITORY) private _postLikedUsersRepos: IPostLikedUsersRepository) {
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
            const currentUserId = await this._commonUtil.getUserId();
            const checkedPost = await this._postRepos.findOne({
                id: id,
                userId: currentUserId,
                isDeleted: false
            });
            if (!checkedPost) {
                return res.return(ErrorMap.E009.Code);
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
            const postId = request.postId;
            const currentUserId = await this._commonUtil.getUserId();

            // Check post existence
            const post = await this._postRepos.findOne({
                id: postId,
                isDeleted: false
            });
            if (!post) {
                return res.return(ErrorMap.E009.Code);
            }

            //Save to "post_liked_users" table
            const postLikedUser = await this._postLikedUsersRepos.findOne({
                postId: postId,
                userId: currentUserId
            });

            if (!postLikedUser) {
                //Create new record if post_liked_users does not exist (the first time user likes post)
                const newPostLikedUser = new PostLikedUsersEntity;
                newPostLikedUser.postId = postId;
                newPostLikedUser.userId = currentUserId;
                newPostLikedUser.isDeleted = false;
                await this._postLikedUsersRepos.create(newPostLikedUser);

                //Update likes quantity in post
                post.likes = post.likes + 1;
            } else {
                //Update record if post_liked_users already exists
                postLikedUser.isDeleted = !postLikedUser.isDeleted;
                await this._postLikedUsersRepos.update(postLikedUser);

                //Update likes quantity in post
                post.likes = postLikedUser.isDeleted ? (post.likes - 1) : (post.likes + 1);
            }
            await this._postRepos.update(post);

            return res.return(ErrorMap.SUCCESSFUL.Code, post);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * getPostById
     * @param id
     */
    async getPostById(id: number): Promise<ResponseDto> {
        this._logger.log("============== Get post by id ==============");
        const res = new ResponseDto();
        try {
            const post = await this._postRepos.findOne({
                id: id,
                isDeleted: false
            });
            if (!post) {
                return res.return(ErrorMap.E009.Code);
            }

            const currentUserId = await this._commonUtil.getUserId();
            const cannotAccessPostOnlyMe = post.privacySettingId === PRIVACY_SETTING.ONLY_ME && currentUserId !== post.userId;
            if (cannotAccessPostOnlyMe) {
                return res.return(ErrorMap.E009.Code);
            }

            return res.return(ErrorMap.SUCCESSFUL.Code, post);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * getPostDetailById
     * @param id
     */
    async getPostDetailById(id: number): Promise<ResponseDto> {
        this._logger.log("============== Get post detail by id ==============");
        const res = new ResponseDto();
        try {
            //Get post by id
            const post = await this._postRepos.findOne({
                id: id,
                isDeleted: false
            });
            if (!post) {
                return res.return(ErrorMap.E009.Code);
            }

            const currentUserId = await this._commonUtil.getUserId();
            const cannotAccessPostOnlyMe = post.privacySettingId === PRIVACY_SETTING.ONLY_ME && currentUserId !== post.userId;
            if (cannotAccessPostOnlyMe) {
                return res.return(ErrorMap.E009.Code);
            }

            //Get photos in post
            const photoList = await this._photoRepos.findByCondition(
                { postId: id, isDeleted: false },
                { createdAt: ORDER_BY.DESC });

            post['photoList'] = photoList;
            return res.return(ErrorMap.SUCCESSFUL.Code, post);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * deletePostById
     * @param id
     */
    async deletePostById(id: number): Promise<ResponseDto> {
        this._logger.log("============== Delete post by id ==============");
        const res = new ResponseDto();
        try {
            //Check post existence
            const currentUserId = await this._commonUtil.getUserId();
            const post = await this._postRepos.findOne({
                id: id,
                userId: currentUserId,
                isDeleted: false
            });
            if (!post) {
                return res.return(ErrorMap.E009.Code);
            }

            //Delete post
            post.isDeleted = true;
            await this._postRepos.update(post);

            //Get photos in post
            const photoList = await this._photoRepos.findByCondition(
                { postId: id, isDeleted: false },
                { id: ORDER_BY.ASC });
            //Delete photos in post
            photoList.map(async photo => {
                photo.isDeleted = true;
                await this._photoRepos.update(photo);
            })

            //Get comments in post
            const commentList = await this._commentRepos.findByCondition(
                { postId: id, isDeleted: false },
                { id: ORDER_BY.ASC });
            //Delete comments in post
            commentList.map(async comment => {
                comment.isDeleted = true;
                await this._commentRepos.update(comment);
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
     * getPostListNewsFeed
     * @param request
     */
    async getPostListNewsFeed(request: GetPostListNewsFeedRequest): Promise<ResponseDto> {
        this._logger.log("============== Get post list in news feed ==============");
        const res = new ResponseDto();
        try {
            const postList = await this._postRepos.getPostListNewsFeed(request);
            for (let i = 0; i < postList.length; i++) {
                //Get photos in post
                const photoList = await this._photoRepos.findByCondition(
                    { postId: postList[i].id, isDeleted: false },
                    { createdAt: ORDER_BY.DESC });
                postList[i].photoList = photoList;
            }
            return res.return(ErrorMap.SUCCESSFUL.Code, postList);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * getPostListWall
     * @param request
     */
    async getPostListWall(request: GetPostListWallRequest): Promise<ResponseDto> {
        this._logger.log("============== Get post list in wall ==============");
        const res = new ResponseDto();
        try {
            const postList = await this._postRepos.getPostListWall(request);
            for (let i = 0; i < postList.length; i++) {
                //Get photos in post
                const photoList = await this._photoRepos.findByCondition(
                    { postId: postList[i].id, isDeleted: false },
                    { createdAt: ORDER_BY.DESC });
                postList[i].photoList = photoList;
            }
            return res.return(ErrorMap.SUCCESSFUL.Code, postList);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }

    /**
     * getListUsersLikePost
     * @param request
     */
    async getListUsersLikePost(request: GetListUsersLikePostRequest): Promise<ResponseDto> {
        this._logger.log("============== Get list of users who liked post ==============");
        const res = new ResponseDto();
        try {
            const userList = await this._postRepos.getListUsersLikePost(request);
            return res.return(ErrorMap.SUCCESSFUL.Code, userList);
        } catch (error) {
            this._logger.error(`${ErrorMap.E500.Code}: ${ErrorMap.E500.Message}`);
            this._logger.error(`${error.name}: ${error.message}`);
            this._logger.error(`${error.stack}`);
            return res.return(ErrorMap.E500.Code);
        }
    }
}