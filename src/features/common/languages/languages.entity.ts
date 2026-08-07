import { Column, Entity } from 'typeorm';
import { BaseModel } from '@/core/base-model';

@Entity('language')
export class Languages extends BaseModel {
  @Column({ type: 'varchar', length: 64 })
  title!: string;
}
