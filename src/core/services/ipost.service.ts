import { CreatePostRequest } from "../dtos/requests/post/create-post.request";
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
}