import { BaseEntityAutoId } from "./base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'device' })
export class DeviceEntity extends BaseEntityAutoId {
    @Column({ name: 'socket_id' })
    socketId: string;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'user_name' })
    userName: string;

    @Column({ name: 'is_connected' })
    isConnected: boolean;

    @Column({ name: 'is_deleted' })
    isDeleted: boolean;
}