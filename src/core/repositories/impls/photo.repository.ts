import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "./base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { IPhotoRepository } from "../iphoto.repository";
import { GetPhotoListByUserIdRequest } from "../../dtos/requests/photo/get-photo-list-by-user-id.request";

@Injectable()
export class PhotoRepository extends BaseRepository implements IPhotoRepository {
    private readonly _logger = new Logger(PhotoRepository.name);
    constructor(@InjectRepository(ENTITIES_CONFIG.PHOTO) private readonly repos: Repository<ObjectLiteral>) {
        super(repos);
        this._logger.log("============== Constructor PhotoRepository ==============");
    }

    /**
     * getPhotoListByUserId
     * @param request
     */
    async getPhotoListByUserId(request: GetPhotoListByUserIdRequest) {
        let params = [];
        const sql = `SELECT pt.id AS id, pt.file_name AS fileName, pt.post_id AS postId, pt.is_deleted AS isDeleted,
        pt.created_at AS createdAt, pt.updated_at AS updatedAt
        FROM Photo pt
            INNER JOIN Post p ON p.id = pt.post_id AND p.is_deleted = FALSE
            INNER JOIN User u ON u.id = p.user_id
        WHERE u.id = ? AND pt.is_deleted = FALSE
        ORDER BY pt.created_at DESC`;

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