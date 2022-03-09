import { BaseEntityAutoId } from "./base/base.entity";
import { Column, Entity } from "typeorm";
import { PRIVACY_SETTING } from "../common/constants/common.constant";

@Entity({ name: 'post' })
export class Post extends BaseEntityAutoId {
    @Column({ name: 'content', length: 10000 })
    content: string;

    @Column({
        type: 'enum',
        enum: PRIVACY_SETTING,
        name: 'privacy_setting_id'
    })
    accountType: PRIVACY_SETTING;

    @Column({ name: 'likes' })
    likes: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'is_deleted' })
    isDeleted: boolean;
}