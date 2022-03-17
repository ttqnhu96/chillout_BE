import { BaseEntityAutoId } from "./base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'comment' })
export class CommentEntity extends BaseEntityAutoId {
    @Column({ name: 'content', length: 5000 })
    content: string;

    @Column({ name: 'post_id' })
    postId: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'is_deleted' })
    isDeleted: boolean;
}