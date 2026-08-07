import { Entity, PrimaryColumn } from 'typeorm';
import { BaseModel } from '@/core/base-model';

@Entity('faqsTags')
export class FaqsTag extends BaseModel {
  @PrimaryColumn()
  faqsId: number;

  @PrimaryColumn()
  tagId: number;

  // @ManyToOne(() => Faqs, (faq) => faq.faqsTags, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'faqsId' })
  // faq: Relation<Faqs>;
  //
  // @ManyToOne(() => Tags, (tag) => tag.faqsTags, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'tagId' })
  // tag: Relation<Tags>;
}
