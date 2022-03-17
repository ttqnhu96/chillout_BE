import { GetCommentListByPostIdRequest } from "../dtos/requests/comment/get-comment-list-by-post-id.request";
import { IBaseRepository } from "./ibase.repository";

export interface ICommentRepository extends IBaseRepository {
    /**
     * getCommentListByPostId
     * @param request
     */
    getCommentListByPostId(request: GetCommentListByPostIdRequest);
}
