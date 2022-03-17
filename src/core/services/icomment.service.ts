import { CreateCommentRequest } from "../dtos/requests/comment/create-comment.request";
import { GetCommentListByPostIdRequest } from "../dtos/requests/comment/get-comment-list-by-post-id.request";
import { UpdateCommentRequest } from "../dtos/requests/comment/update-comment.request";
import { ResponseDto } from "../dtos/responses/response.dto";
import { IBaseService } from "./ibase.service";

export interface ICommentService extends IBaseService {
    /**
     * createComment
     * @param request
     */
    createComment(request: CreateCommentRequest): Promise<ResponseDto>;

    /**
     * updateComment
     * @param id
     * @param request
     */
    updateComment(id: number, request: UpdateCommentRequest): Promise<ResponseDto>;
    
    /**
     * getCommentById
     * @param id
     */
    getCommentById(id: number): Promise<ResponseDto>;

    /**
     * deleteCommentById
     * @param id
     */
    deleteCommentById(id: number): Promise<ResponseDto>;

    /**
     * getCommentListByPostId
     * @param request
     */
    getCommentListByPostId(request: GetCommentListByPostIdRequest): Promise<ResponseDto>;
}