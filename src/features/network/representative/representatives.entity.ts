import { Column, Entity, OneToMany } from 'typeorm';
import { Branches } from '../branches/branches.entity';
import { BaseModel } from '@/core/base-model';
import type { Relation } from 'typeorm';

@Entity('representatives')
export class Representatives extends BaseModel {
  @Column({ type: 'varchar', length: 64 })
  fullName!: string;

  @Column({ type: 'varchar', length: 128 })
  image!: string;

  @Column({ type: 'varchar', length: 64 })
  email!: string;

  @Column({ type: 'varchar', length: 16 })
  phoneNumber!: string;

  @Column({ type: 'text' })
  resume!: string;

  @OneToMany(() => Branches, (branch) => branch.representative, { onDelete: 'RESTRICT' })
  branch?: Relation<Branches[]>;
}
