import { BaseEntityAutoId } from "./base/base.entity";
import { Column, Entity } from "typeorm";
import { RELATIONSHIP_TYPE_ENUM } from "../common/constants/common.constant";

@Entity({ name: 'relationship' })
export class RelationshipEntity extends BaseEntityAutoId {
    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'friend_id' })
    friendId: number;

    @Column({
        type: 'enum',
        enum: RELATIONSHIP_TYPE_ENUM,
        name: 'type'
    })
    type: RELATIONSHIP_TYPE_ENUM;
}