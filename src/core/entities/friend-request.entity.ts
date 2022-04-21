import { BaseEntityAutoId } from "./base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'friend_request' })
export class FriendRequestEntity extends BaseEntityAutoId {
    @Column({name: 'sender_id'})
    senderId: number;

    @Column({ name: 'receiver_id' })
    receiverId: number;

    @Column({ name: 'is_accepted' })
    isAccepted: boolean;

    @Column({ name: 'is_deleted' })
    isDeleted: boolean;
}
