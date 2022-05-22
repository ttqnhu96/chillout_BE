import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ENTITIES_CONFIG } from "../../config/module.config";
import { BaseRepository } from "../../repositories/impls/base.repository";
import { ObjectLiteral, Repository } from "typeorm";
import { INotificationRepository } from "../inotification.repository";
import { GetNotificationListByReceiverIdRequest } from "src/core/dtos/requests/notification/get-notification-list-by-receiver-id.request";

@Injectable()
export class NotificationRepository extends BaseRepository implements INotificationRepository {
    private readonly _logger = new Logger(NotificationRepository.name);
    constructor(@InjectRepository(ENTITIES_CONFIG.NOTIFICATION) private readonly repos: Repository<ObjectLiteral>) {
        super(repos);
        this._logger.log("============== Constructor NotificationRepository ==============");
    }

    /**
     * getNotificationListByReceiverId
     * @param request
     */
     async getNotificationListByReceiverId(request: GetNotificationListByReceiverIdRequest) {
        let params = [];
        const sql = `SELECT n.Id AS id, n.executor_id AS executorId, n.receiver_id AS receiverId, n.action AS action,
            n.object_type AS objectType, n.object_id AS objectId, n.message AS message, n.is_deleted AS isDeleted,
            n.created_at AS createdAt, n.updated_at AS updatedAt, n.created_by AS createdBy, n.updated_by AS updatedBy,
            (SELECT CONCAT(pro.first_name, ' ', pro.last_name) FROM profile pro WHERE pro.Id = u.profile_id) AS executorName,
            (SELECT pro.avatar FROM profile pro WHERE pro.Id = u.profile_id) AS executorAvatar
        FROM Notification n
            INNER JOIN User u ON u.id = n.executor_id
        WHERE n.receiver_id = ? AND n.is_deleted = FALSE
        ORDER BY n.created_at DESC`;
        const sqlPagination = ` LIMIT ? OFFSET ?`;

        params.push(request.receiverId);
        if (request.isPaginated) {
            params.push(request.pageSize);
            params.push(request.pageIndex * request.pageSize);
            return await this.repos.query(sql + sqlPagination, params);
        } else {
            return await this.repos.query(sql, params);
        }
    }
}