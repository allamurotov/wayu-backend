import { Entity, Column } from 'typeorm';
import { BaseModel } from '@/core/base-model';

@Entity('instagram-posts')
export class InstagramPost extends BaseModel {
  @Column({ type: 'varchar', length: 256 })
  image!: string;

  @Column({ type: 'varchar', length: 128 })
  link!: string;
}
