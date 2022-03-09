'use strict';

import { Column, CreateDateColumn, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
    })
    updatedAt: Date;

    @Column({ name: 'created_by' })
    createdBy: string;

    @Column({ name: 'updated_by' })
    updatedBy: string;
}

export class BaseEntityId extends BaseEntity {
    @PrimaryColumn({ name: 'id' })
    id: string;

}

export class BaseEntityUUID extends BaseEntity {
    @PrimaryGeneratedColumn("uuid", { name: 'id' })
    id: string;
}

export class BaseEntityAutoId extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { name: 'id' })
    id: number;
}
