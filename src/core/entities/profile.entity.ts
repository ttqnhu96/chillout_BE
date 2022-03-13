import { BaseEntityAutoId } from "./base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'profile' })
export class ProfileEntity extends BaseEntityAutoId {
    @Column({ name: 'full_name' })
    fullName: string;

    @Column({ name: 'gender' })
    gender: string;

    @Column({ name: 'birthday' })
    birthday: Date;

    @Column({ name: 'phone' })
    phone: string;

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'bio' })
    bio: string;

    @Column({ name: 'avatar' })
    avatar: string;

    @Column({ name: 'city_id' })
    cityId: number;

    @Column({ name: 'school_id' })
    schoolId: number;

    @Column({ name: 'college_id' })
    collegeId: number;

    @Column({ name: 'workplace_id' })
    workplaceId: number;

    @Column({ name: 'relationship_id' })
    relationshipId: number;
}