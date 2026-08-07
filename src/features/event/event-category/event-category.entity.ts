import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '@/core/base-model';
import type { Relation } from 'typeorm';
import { Events } from '@/features/event/event/events.entity';

@Entity('event-category')
export class EventCategories extends BaseModel {
  @Column({ type: 'varchar', length: 64, unique: true })
  title!: string;

  @OneToMany(() => Events, (event) => event.eventCategory, { onDelete: 'RESTRICT' })
  events?: Relation<Events[]>;
}
