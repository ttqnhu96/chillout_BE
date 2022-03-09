import { BaseEntityAutoId } from "./base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'post_liked_users' })
export class PostLikedUsers extends BaseEntityAutoId {
    @Column({ name: 'post_id' })
    postId: number;

    @Column({ name: 'user_id' })
    userId: number;
}