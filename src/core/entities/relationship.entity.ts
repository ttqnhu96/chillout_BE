import { BaseEntityAutoId } from "./base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'relationship' })
export class RelationshipEntity extends BaseEntityAutoId {
    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'friend_id' })
    friendId: number;
}