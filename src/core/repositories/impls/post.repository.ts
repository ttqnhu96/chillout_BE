import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "./base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { IPostRepository } from "../ipost.repository";
import { GetPostListNewsFeedRequest } from "../../dtos/requests/post/get-post-list-news-feed.request";
import { GetPostListWallRequest } from "../../dtos/requests/post/get-post-list-wall.request";

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
        const sql = `SELECT p.id AS id, p.content AS content, p.privacy_setting_id AS privacySettingId, p.likes AS likes, 
        p.user_id AS userId, p.created_at AS createdAt, p.updated_at AS updatedAt
        FROM Post p
            INNER JOIN User u ON u.id = p.user_id
            INNER JOIN Profile pro ON pro.id = u.profile_id
            LEFT JOIN Relationship r ON r.id = pro.relationship_id
        WHERE ( p.user_id = ? 
            OR ( p.user_id = r.user_id_2 AND r.user_id_1 = ? ) )
            AND p.is_deleted = FALSE
        ORDER BY p.created_at DESC
        LIMIT ? OFFSET ?`;
        params.push(request.userId);
        params.push(request.userId);
        params.push(request.pageSize);
        params.push(request.pageIndex * request.pageSize);
        return await this.repos.query(sql, params);
    }

    /**
     * getPostListWall
     * @param request
     */
    async getPostListWall(request: GetPostListWallRequest) {
        let params = [];
        const sql = `SELECT p.id AS id, p.content AS content, p.privacy_setting_id AS privacySettingId, p.likes AS likes, 
        p.user_id AS userId, p.created_at AS createdAt, p.updated_at AS updatedAt
        FROM Post p
        WHERE p.user_id = ? AND p.is_deleted = FALSE
        ORDER BY p.created_at DESC
        LIMIT ? OFFSET ?`;
        params.push(request.userId);
        params.push(request.pageSize);
        params.push(request.pageIndex * request.pageSize);
        return await this.repos.query(sql, params);
    }
}