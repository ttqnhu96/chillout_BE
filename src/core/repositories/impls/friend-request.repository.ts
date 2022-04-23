import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "./base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { IFriendRequestRepository } from "../ifriend-request.repository";
import { GetReceivedFriendRequestListRequest } from "src/core/dtos/requests/friend-request/get-received-friend-request-list.request";

@Injectable()
export class FriendRequestRepository extends BaseRepository implements IFriendRequestRepository {
    private readonly _logger = new Logger(FriendRequestRepository.name);
    constructor(@InjectRepository(ENTITIES_CONFIG.FRIEND_REQUEST) private readonly repos: Repository<ObjectLiteral>) {
        super(repos);
        this._logger.log("============== Constructor FriendRequestRepository ==============");
    }

    /**
     * getReceivedFriendRequestList
     * @param request
     */
    async getReceivedFriendRequestList(request: GetReceivedFriendRequestListRequest) {
        let params = [];
        const sql = `SELECT fr.Id AS id, fr.sender_id AS senderId, fr.receiver_id AS receiverId, fr.is_accepted AS isAccepted, 
        pro.id AS profileId, pro.first_name AS firstName, pro.last_name AS lastName, pro.avatar AS avatar
        FROM friend_request fr
            INNER JOIN user u ON u.id = fr.sender_id
            INNER JOIN profile pro ON pro.id = u.profile_id 
        WHERE fr.receiver_id = ? AND fr.is_accepted = FALSE AND fr.is_deleted = FALSE
        ORDER BY fr.created_at DESC`;
        const sqlPagination = ` LIMIT ? OFFSET ?`;

        params.push(request.receiverId);
        if(request.isPaginated) {
            params.push(request.pageSize);
            params.push(request.pageIndex * request.pageSize);
            return await this.repos.query(sql + sqlPagination, params);
        } else {
            return await this.repos.query(sql, params);
        }
    }
}