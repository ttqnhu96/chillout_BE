import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "./base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { IRelationshipRepository } from "../irelationship.repository";
import { GetSuggestionsListRequest } from "../../dtos/requests/relationship/get-suggestions-list.request";
import { GetFriendListRequest } from "src/core/dtos/requests/relationship/get-friend-list.request";

@Injectable()
export class RelationshipRepository extends BaseRepository implements IRelationshipRepository {
    private readonly _logger = new Logger(RelationshipRepository.name);
    constructor(@InjectRepository(ENTITIES_CONFIG.RELATIONSHIP) private readonly repos: Repository<ObjectLiteral>) {
        super(repos);
        this._logger.log("============== Constructor RelationshipRepository ==============");
    }

    /**
     * getSuggestionsList
     * @param request
     */
    async getSuggestionsList(request: GetSuggestionsListRequest) {
        let params = [];
        const sql = `SELECT u.id AS userId, u.username AS username, pro.id AS profileId, 
        pro.first_name AS firstName, pro.last_name AS lastName, pro.avatar AS avatar
        FROM user u 
            INNER JOIN profile pro ON pro.id = u.profile_id 
        WHERE u.id != ? AND u.Id NOT IN (SELECT r.friend_id FROM relationship r WHERE r.user_id = ?)
        ORDER BY pro.first_name ASC`;
        const sqlPagination = ` LIMIT ? OFFSET ?`;

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
     * getFriendList
     * @param request
     */
    async getFriendList(request: GetFriendListRequest) {
        console.log(request)
        let params = [];
        const sql = `SELECT u.id AS userId, u.username AS username, pro.id AS profileId, 
        pro.first_name AS firstName, pro.last_name AS lastName, pro.avatar AS avatar
        FROM user u 
            INNER JOIN profile pro ON pro.id = u.profile_id 
        WHERE u.Id IN 
            (SELECT r.friend_id FROM relationship r WHERE r.user_id = ?)
        ORDER BY pro.first_name ASC`;
        const sqlPagination = ` LIMIT ? OFFSET ?`;

        params.push(request.userId);
        if(request.isPaginated) {
            params.push(request.pageSize);
            params.push(request.pageIndex * request.pageSize);
            return await this.repos.query(sql + sqlPagination, params);
        } else {
            return await this.repos.query(sql, params);
        }
    }
}