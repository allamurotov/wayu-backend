import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '@/core/base-model';
import { News } from '@/features/news/news/news.entity';
import type { Relation } from 'typeorm';

@Entity('news-category')
export class NewsCategories extends BaseModel {
  @Column({ type: 'varchar', length: 64, unique: true })
  title!: string;

  @OneToMany(() => News, (news) => news.category, { onDelete: 'RESTRICT' })
  news?: Relation<News[]>;
}
