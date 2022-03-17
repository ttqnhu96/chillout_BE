import { BaseEntityAutoId } from "./base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'relationship' })
export class RelationshipEntity extends BaseEntityAutoId {
    @Column({ name: 'user_id_1' })
    userId1: number;

    @Column({ name: 'user_id_2' })
    userId2: number;
}