import { GetPostListNewsFeedRequest } from "../dtos/requests/post/get-post-list-news-feed.request";
import { GetPostListWallRequest } from "../dtos/requests/post/get-post-list-wall.request";
import { IBaseRepository } from "./ibase.repository";

export interface IPostRepository extends IBaseRepository {
    /**
     * getPostListInNewsFeed
     * @param request
     */
    getPostListNewsFeed(request: GetPostListNewsFeedRequest);

    /**
     * getPostListWall
     * @param request
     */
    getPostListWall(request: GetPostListWallRequest);
}
