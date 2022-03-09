import { BaseEntityAutoId } from "./base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'workplace' })
export class Workplace extends BaseEntityAutoId {
    @Column({name: 'name'})
    name: string;

    @Column({ name: 'is_active' })
    isActive: boolean;
}