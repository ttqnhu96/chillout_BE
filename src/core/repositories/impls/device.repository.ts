import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "./base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { IDeviceRepository } from "../idevice.repository";

@Injectable()
export class DeviceRepository extends BaseRepository implements IDeviceRepository {
    private readonly _logger = new Logger(DeviceRepository.name);
    constructor(@InjectRepository(ENTITIES_CONFIG.DEVICE) private readonly repos: Repository<ObjectLiteral>) {
        super(repos);
        this._logger.log("============== Constructor DeviceRepository ==============");
    }

    /**
     * getCommentListByPostId
     * @param request
     */
    // async getDeviceIdByUserId(userId: number) {
    //     let params = [];
    //     const sql = `SELECT d.socket_id AS socketId
    //     FROM Device d WHERE d.is_deleted = FALSE AND d.user_id = ${userId}`;
    //     // const sql = `SELECT c.id AS id, c.content AS content, c.post_id AS postId, c.user_id AS userId, c.created_at AS createdAt, 
    //     // c.updated_at AS updatedAt, pro.first_name AS firstName, pro.last_name AS lastName, pro.avatar AS avatar
    //     // FROM Comment c
    //     //     INNER JOIN Post p ON p.id = c.post_id AND p.is_deleted = FALSE
    //     //     INNER JOIN User u ON u.id = c.user_id
    //     //     INNER JOIN Profile pro ON pro.id = u.profile_id
    //     // WHERE c.is_deleted = FALSE AND p.id = ?
    //     // ORDER BY c.created_at DESC
    //     // LIMIT ? OFFSET ?`;
    //     // params.push(request.postId);
    //     // params.push(request.pageSize);
    //     // params.push(request.pageIndex * request.pageSize);
    //     return await this.repos.query(sql, params);
    // }
}