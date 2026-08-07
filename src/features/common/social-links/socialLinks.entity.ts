import { Column, Entity } from 'typeorm';
import { BaseModel } from '@/core/base-model';

@Entity('social-links')
export class SocialLinks extends BaseModel {
  @Column({ type: 'varchar', length: 64 })
  title!: string;

  @Column({ type: 'varchar', length: 128 })
  icon!: string;

  @Column({ type: 'varchar', length: 128 })
  link!: string;
}
