import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "./base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { IPostRepository } from "../ipost.repository";
import { GetPostListNewsFeedRequest } from "../../dtos/requests/post/get-post-list-news-feed.request";
import { GetPostListWallRequest } from "../../dtos/requests/post/get-post-list-wall.request";
import { GetListUsersLikePostRequest } from "../../dtos/requests/post/get-list-users-like-post.request";
import { COMMON_CONSTANTS, PRIVACY_SETTING, USER_STATUS_ENUM } from "../../common/constants/common.constant";
import { SearchRequest } from "../../dtos/requests/common/search.request";

@Injectable()
export class PostRepository extends BaseRepository implements IPostRepository {
    private readonly _logger = new Logger(PostRepository.name);
    constructor(@InjectRepository(ENTITIES_CONFIG.POST) private readonly repos: Repository<ObjectLiteral>) {
        super(repos);
        this._logger.log("============== Constructor PostRepository ==============");
    }

    /**
     * getPostListNewsFeed
     * @param request
     */
    async getPostListNewsFeed(request: GetPostListNewsFeedRequest) {
        let params = [];
        const sql = `SELECT p.id AS id, pro.id AS profileId, p.content AS content, p.privacy_setting_id AS privacySettingId, 
        (SELECT COUNT(plu.id) FROM post_liked_users plu WHERE plu.post_id = p.id AND plu.is_deleted = FALSE) AS likes, 
        p.user_id AS userId, p.created_at AS createdAt, p.updated_at AS updatedAt,
        (SELECT COUNT(c.id) FROM comment c WHERE c.post_id = p.id AND c.is_deleted = FALSE) AS totalComment,
        pro.first_name AS firstName, pro.last_name AS lastName, pro.avatar AS avatar
        FROM Post p
            INNER JOIN User u ON u.id = p.user_id
            INNER JOIN Profile pro ON pro.id = u.profile_id
            LEFT JOIN Relationship r ON r.friend_id = u.id
        WHERE ( p.user_id = ? OR r.user_id = ? )
            AND p.is_deleted = FALSE
            AND (CASE WHEN p.user_id = ? THEN p.privacy_setting_id IN ('${PRIVACY_SETTING.ONLY_ME}', '${PRIVACY_SETTING.PUBLIC}') 
                ELSE p.privacy_setting_id = '${PRIVACY_SETTING.PUBLIC}' END)
        ORDER BY p.created_at DESC`;
        const sqlPagination = ` LIMIT ? OFFSET ?`;

        params.push(request.userId);
        params.push(request.userId);
        params.push(request.userId);
        if(request.isPaginated) {
            params.push(request.pageSize);
            params.push(request.pageIndex * request.pageSize);
            return await this.repos.query(sql + sqlPagination, params);
        } else {
            return await this.repos.query(sql, params);
        }
    }

    /**
     * getPostListWall
     * @param currentUserId
     * @param request
     */
    async getPostListWall(currentUserId: number, request: GetPostListWallRequest) {
        let params = [];
        const sql = `SELECT p.id AS id, pro.id AS profileId, pro.first_name AS firstName, pro.last_name AS lastName, 
        p.content AS content, pro.avatar AS avatar, p.privacy_setting_id AS privacySettingId,
        (SELECT COUNT(plu.id) FROM post_liked_users plu WHERE plu.post_id = p.id AND plu.is_deleted = FALSE) AS likes, 
        p.user_id AS userId, p.created_at AS createdAt, p.updated_at AS updatedAt, 
        (SELECT COUNT(c.id) FROM comment c WHERE c.post_id = p.id AND c.is_deleted = FALSE) AS totalComment
        FROM Post p
            INNER JOIN user u ON u.id = p.user_id
            INNER JOIN profile pro ON pro.id = u.profile_id
        WHERE p.user_id = ? AND p.is_deleted = FALSE
        AND (CASE WHEN p.user_id != ? THEN p.privacy_setting_id = '${PRIVACY_SETTING.PUBLIC}' 
            ELSE p.privacy_setting_id IN ('${PRIVACY_SETTING.ONLY_ME}', '${PRIVACY_SETTING.PUBLIC}') END)
        ORDER BY p.created_at DESC`;
        const sqlPagination = ` LIMIT ? OFFSET ?`;

        params.push(request.userId);
        params.push(currentUserId);
        if(request.isPaginated) {
            params.push(request.pageSize);
            params.push(request.pageIndex * request.pageSize);
            return await this.repos.query(sql + sqlPagination, params);
        } else {
            return await this.repos.query(sql, params);
        }
    }

    /**
     * getListUsersLikePost
     * @param request
     */
    async getListUsersLikePost(request: GetListUsersLikePostRequest) {
        let params = [];
        const sql = `SELECT pro.avatar AS avatar, pro.first_name AS firstName, pro.last_name AS lastName
        FROM post_liked_users plu
            INNER JOIN post p ON p.id = plu.post_id AND p.is_deleted = FALSE
            INNER JOIN user u ON u.id = plu.user_id AND u.user_status = '${USER_STATUS_ENUM.ACTIVE}'
            INNER JOIN profile pro ON pro.id = u.profile_id
        WHERE plu.post_id = ? AND plu.is_deleted = FALSE
        ORDER BY plu.created_at DESC
        LIMIT ? OFFSET ?`;
        params.push(request.postId);
        params.push(request.pageSize);
        params.push(request.pageIndex * request.pageSize);
        return await this.repos.query(sql, params);
    }

    /**
     * searchPost
     * @param request 
     */
    async searchPost(request: SearchRequest) {
        let params = [];
        let sql: string = `SELECT pro.first_name AS firstName, pro.last_name AS lastName, pro.avatar AS avatar, 
        p.Id AS id, p.content AS content, p.created_at AS createdAt 
        FROM post p
            INNER JOIN user u ON u.id = p.user_id AND u.user_status = '${USER_STATUS_ENUM.ACTIVE}'
            INNER JOIN profile pro ON pro.id = u.profile_id
        WHERE p.id > 0 AND p.is_deleted = FALSE`;
        if (request.attribute && request.attribute.trim().length > 0) {
            sql += ` AND (p.content LIKE ? ESCAPE '${COMMON_CONSTANTS.PIPE_CHAR}')`;
            params.push(COMMON_CONSTANTS.PERCENT_CHAR + COMMON_CONSTANTS.PIPE_CHAR + request.attribute + COMMON_CONSTANTS.PERCENT_CHAR);
        }

        sql += " ORDER BY p.created_at ASC LIMIT ? OFFSET ?";
        params.push(request.pageSize);
        params.push(request.pageIndex * request.pageSize);

        return await this.repos.query(sql, params);
    }
}