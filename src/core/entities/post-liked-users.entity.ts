import { BaseEntityAutoId } from "./base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'post_liked_users' })
export class PostLikedUsersEntity extends BaseEntityAutoId {
    @Column({ name: 'post_id' })
    postId: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'is_deleted' })
    isDeleted: boolean;
}