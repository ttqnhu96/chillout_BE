import { BaseEntityAutoId } from "./base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'photo' })
export class Photo extends BaseEntityAutoId {
    @Column({ name: 'file_name' })
    fileName: number;

    @Column({ name: 'post_id' })
    postId: number;

    @Column({ name: 'is_deleted' })
    isDeleted: boolean;
}