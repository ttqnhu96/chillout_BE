import { SearchRequest } from "../dtos/requests/common/search.request";
import { CreatePostRequest } from "../dtos/requests/post/create-post.request";
import { GetListUsersLikePostRequest } from "../dtos/requests/post/get-list-users-like-post.request";
import { GetPostListNewsFeedRequest } from "../dtos/requests/post/get-post-list-news-feed.request";
import { GetPostListWallRequest } from "../dtos/requests/post/get-post-list-wall.request";
import { UpdateLikesRequest } from "../dtos/requests/post/like-post.request";
import { UpdatePostRequest } from "../dtos/requests/post/update-post.request";
import { ResponseDto } from "../dtos/responses/response.dto";
import { IBaseService } from "./ibase.service";

export interface IPostService extends IBaseService {
    /**
     * createPost
     * @param request
     */
    createPost(request: CreatePostRequest): Promise<ResponseDto>;
    
    /**
     * updatePost
     * @param id
     * @param request
     */
    updatePost(id: number, request: UpdatePostRequest): Promise<ResponseDto>;

    /**
     * updateLikes
     * @param request
     */
    updateLikes(request: UpdateLikesRequest): Promise<ResponseDto>;

    /**
     * getPostById
     * @param id
     */
    getPostById(id: number): Promise<ResponseDto>;

    /**
     * getPostDetailById
     * @param id
     */
    getPostDetailById(id: number): Promise<ResponseDto>;

    /**
     * deletePostById
     * @param id
     */
    deletePostById(id: number): Promise<ResponseDto>;

    /**
     * getPostListNewsFeed
     * @param request
     */
    getPostListNewsFeed(request: GetPostListNewsFeedRequest): Promise<ResponseDto>;

    /**
     * getPostListWall
     * @param request
     */
    getPostListWall(request: GetPostListWallRequest): Promise<ResponseDto>;

    /**
     * getListUsersLikePost
     * @param request
     */
    getListUsersLikePost(request: GetListUsersLikePostRequest): Promise<ResponseDto>;

    /**
     * searchPost
     * @param request 
     */
    searchPost(request: SearchRequest);
}