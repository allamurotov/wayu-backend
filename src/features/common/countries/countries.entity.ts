import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '@/core/base-model';
import { News } from '@/features/news/news/news.entity';
import { Branches } from '../../network/branches/branches.entity';
import type { Relation } from 'typeorm';

@Entity('countries')
export class Countries extends BaseModel {
  @Column({ type: 'varchar', length: 64, unique: true })
  title!: string;

  @Column({ type: 'varchar', length: 128 })
  flag!: string;

  @OneToMany(() => News, (news) => news.country)
  news?: Relation<News[]>;

  @OneToMany(() => Branches, (branch) => branch.country)
  branch?: Relation<Branches[]>;
}
