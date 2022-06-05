import { BaseEntityAutoId } from "./base/base.entity";
import { Column, Entity } from "typeorm";
import { NOTIFICATION_ACTION_ENUM, OBJECT_TYPE_ENUM } from "../common/constants/common.constant";

@Entity({ name: 'notification' })
export class NotificationEntity extends BaseEntityAutoId {
    @Column({ name: 'executor_id' })
    executorId: number;

    @Column({ name: 'receiver_id' })
    receiverId: number;

    @Column({
        type: 'enum',
        enum: NOTIFICATION_ACTION_ENUM,
        name: 'action'
    })
    action: NOTIFICATION_ACTION_ENUM;

    @Column({
        type: 'enum',
        enum: OBJECT_TYPE_ENUM,
        name: 'object_type'
    })
    objectType: OBJECT_TYPE_ENUM;

    @Column({ name: 'object_id' })
    objectId: number;

    @Column({ name: 'message' })
    message: string;

    @Column({ name: 'is_read', default: false })
    isRead: boolean;

    @Column({ name: 'is_deleted' })
    isDeleted: boolean;
}
