import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '@/core/base-model';
import { Authors } from '../author/authors.entity';
import { BookCategories } from '../book-category/bookCategories.entity';
import type { Relation } from 'typeorm';

@Entity('books')
export class Books extends BaseModel {
  @Column({ type: 'int' })
  authorId!: number;

  @Column({ type: 'int' })
  categoryId!: number;

  @Column({ type: 'varchar', length: 256 })
  title!: string;

  @Column({ type: 'varchar', length: 128 })
  image!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 256 })
  file!: string;

  @Column({ type: 'int' })
  pages!: number;

  @Column({ type: 'int' })
  year!: number;

  @ManyToOne(() => Authors, (author) => author.book)
  book?: Relation<Authors>;

  @ManyToOne(() => BookCategories, (category) => category.book)
  category?: Relation<Authors>;
}
