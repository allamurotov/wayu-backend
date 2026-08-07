import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '@/core/base-model';
import { Books } from '../book/books.entity';
import type { Relation } from 'typeorm';

@Entity('author')
export class Authors extends BaseModel {
  @Column({ type: 'varchar', length: 64 })
  fullName!: string;

  @OneToMany(() => Books, (book) => book.book)
  book?: Relation<Books[]>;
}
