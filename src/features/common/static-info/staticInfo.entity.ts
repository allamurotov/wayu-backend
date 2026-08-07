import { Column, Entity } from 'typeorm';
import { BaseModel } from '@/core/base-model';

@Entity('static-info')
export class StaticInfo extends BaseModel {
  @Column({ type: 'varchar', length: 128 })
  appStoreLink?: string;

  @Column({ type: 'varchar', length: 128 })
  playMarketLink?: string;

  @Column({ type: 'text' })
  aboutUs!: string;
}
