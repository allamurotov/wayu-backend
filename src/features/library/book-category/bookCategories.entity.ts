import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '@/core/base-model';
import { Books } from '../book/books.entity';
import type { Relation } from 'typeorm';

@Entity('book-category')
export class BookCategories extends BaseModel {
  @Column({ type: 'varchar', length: 64 })
  title!: string;

  @OneToMany(() => Books, (book) => book.category)
  book?: Relation<Books[]>;
}
