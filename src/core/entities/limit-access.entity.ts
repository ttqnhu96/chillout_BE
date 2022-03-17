import { BaseEntityAutoId } from "./base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'limit_access' })
export class LimitAccessEntity extends BaseEntityAutoId {
    @Column({ name: 'post_id' })
    postId: number;

    @Column({ name: 'user_id' })
    userId: number;
}