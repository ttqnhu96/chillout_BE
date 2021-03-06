import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "./base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { ICommentRepository } from "../icomment.repository";
import { GetCommentListByPostIdRequest } from "../../dtos/requests/comment/get-comment-list-by-post-id.request";

@Injectable()
export class CommentRepository extends BaseRepository implements ICommentRepository {
    private readonly _logger = new Logger(CommentRepository.name);
    constructor(@InjectRepository(ENTITIES_CONFIG.COMMENT) private readonly repos: Repository<ObjectLiteral>) {
        super(repos);
        this._logger.log("============== Constructor CommentRepository ==============");
    }

    /**
     * getCommentListByPostId
     * @param request
     */
    async getCommentListByPostId(request: GetCommentListByPostIdRequest) {
        let result = [];
        let params = [];
        const sqlSelect = `SELECT c.id AS id, c.content AS content, c.post_id AS postId, c.user_id AS userId, c.created_at AS createdAt, 
        c.updated_at AS updatedAt, pro.id AS profileId, pro.first_name AS firstName, pro.last_name AS lastName, pro.avatar AS avatar`;
        let sqlCount: string = `SELECT COUNT(*) AS Total`;
        let sql: string = ` FROM Comment c
            INNER JOIN Post p ON p.id = c.post_id AND p.is_deleted = FALSE
            INNER JOIN User u ON u.id = c.user_id
            INNER JOIN Profile pro ON pro.id = u.profile_id
        WHERE c.is_deleted = FALSE AND p.id = ?
        ORDER BY c.created_at DESC`;
        let sqlLimit = ` LIMIT ? OFFSET ?`;
        params.push(request.postId);
        params.push(request.pageSize);
        params.push(request.pageIndex * request.pageSize);

        result[0] = await this.repos.query(sqlSelect + sql + sqlLimit, params);
        result[1] = await this.repos.query(sqlCount + sql, params);
        return result;
    }
}