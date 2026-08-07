import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import { Countries } from '@/features/common/countries/countries.entity';
import { Representatives } from '../representative/representatives.entity';
import { BaseModel } from '@/core/base-model';

@Entity('branches')
export class Branches extends BaseModel {
  @Column({ type: 'int' })
  countryId!: number;

  @Column({ type: 'int' })
  representativeId!: number;

  @Column({ type: 'varchar', length: 64 })
  city!: string;

  @Column({ type: 'decimal' })
  latitude!: number;

  @Column({ type: 'decimal' })
  longitude!: number;

  @Column({ type: 'varchar', length: 16 })
  phoneNumber!: string;

  @ManyToOne(() => Countries, (country) => country.branch)
  country?: Relation<Countries>;

  @ManyToOne(() => Representatives, (representative) => representative.branch)
  representative?: Relation<Representatives>;
}
