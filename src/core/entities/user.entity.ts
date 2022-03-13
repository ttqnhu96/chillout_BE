import { BaseEntityAutoId } from "./base/base.entity";
import { Column, Entity } from "typeorm";
import { LANGUAGE_ENUM, USER_STATUS_ENUM, USER_TYPE_ENUM } from "../common/constants/common.constant";

@Entity({ name: 'user' })
export class UserEntity extends BaseEntityAutoId {
    @Column({ name: 'username' })
    username: string;

    @Column({ name: 'password' })
    password: string;

    @Column({
        type: 'enum',
        enum: USER_TYPE_ENUM,
        name: 'user_type'
    })
    userType: USER_TYPE_ENUM;

    @Column({
        type: 'enum',
        enum: USER_STATUS_ENUM,
        name: 'user_status'
    })
    userStatus: USER_STATUS_ENUM;

    @Column({
        type: 'enum',
        enum: LANGUAGE_ENUM,
        name: 'language'
    })
    language: LANGUAGE_ENUM;

    @Column({ name: 'profile_id' })
    profileId: number;
}