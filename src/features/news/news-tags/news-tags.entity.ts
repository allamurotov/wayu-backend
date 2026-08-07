import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { News } from '@/features/news/news/news.entity';
import { Tags } from '@/features/common/tags/tags.entity';
import type { Relation } from 'typeorm';

@Entity('newsTags')
export class NewsTag {
  @PrimaryColumn()
  newsId: number;

  @PrimaryColumn()
  tagId: number;

  // @ManyToOne(() => News, (news) => news.newsTags)
  // @JoinColumn({ name: 'newsId' })
  // news: Relation<News>;
  //
  // @ManyToOne(() => Tags, (tag) => tag.newsTags)
  // @JoinColumn({ name: 'tagId' })
  // tag: Relation<Tags>;
}
