import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '@/core/base-model';
import { Countries } from '@/features/common/countries/countries.entity';
import { Tags } from '@/features/common/tags/tags.entity';
import type { Relation } from 'typeorm';
import { NewsCategories } from '@/features/news/news-category/news-category.entity';

@Entity('news')
export class News extends BaseModel {
  @Column({ type: 'int' })
  categoryId!: number;

  @Column({ type: 'int', nullable: true })
  countryId?: number;

  @Column({ type: 'varchar', length: 256 })
  title!: string;

  @Column({ type: 'varchar', length: 128 })
  image!: string;

  @Column({ type: 'date' })
  date!: string;

  @Column({ type: 'text' })
  content!: string;

  @ManyToOne(() => NewsCategories, (category) => category.news, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'categoryId' })
  category?: Relation<NewsCategories>;

  @ManyToOne(() => Countries, (country) => country.news, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'countryId' })
  country?: Relation<Countries>;

  @ManyToMany(() => Tags, (tag) => tag.news)
  @JoinTable()
  tags: Relation<Tags[]>;
}
