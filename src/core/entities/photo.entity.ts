import { BaseEntityAutoId } from "./base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'photo' })
export class PhotoEntity extends BaseEntityAutoId {
    @Column({ name: 'file_name' })
    fileName: string;

    @Column({ name: 'post_id' })
    postId: number;

    @Column({ name: 'is_deleted' })
    isDeleted: boolean;
}