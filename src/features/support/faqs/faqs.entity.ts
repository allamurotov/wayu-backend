import { Column, Entity, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BaseModel } from '@/core/base-model';
import { Tags } from '@/features/common/tags/tags.entity';
import { FaqsTag } from '../faqs-tags/faqsTags.entity';
import type { Relation } from 'typeorm';

@Entity('faqs')
export class Faqs extends BaseModel {
  @Column({ type: 'varchar', length: 256, nullable: false })
  question!: string;

  @Column({ type: 'varchar', length: 512, nullable: false })
  answer!: string;

  @ManyToMany(() => Tags, (tag) => tag.faqs)
  @JoinTable()
  tags: Relation<Tags[]>;
}
