import { Column, Entity, ManyToOne } from 'typeorm';
import { Vacancies } from '../vacancy/vacancies.entity';
import { BaseModel } from '@/core/base-model';
import { ApplicationStatus } from '@/core/enum/enum';
import type { Relation } from 'typeorm';

@Entity('application')
export class Applications extends BaseModel {
  @Column({ type: 'varchar', length: 64 })
  fullName!: string;

  @Column({ type: 'varchar', length: 16 })
  phoneNumber!: string;

  @Column({ type: 'varchar', length: 64 })
  email!: string;

  @Column({ type: 'int' })
  vacancyId!: number;

  @Column({ type: 'varchar', length: 128 })
  resume!: string;

  @Column({ type: 'enum', enum: ApplicationStatus, default: 'active' })
  status!: ApplicationStatus;

  @ManyToOne(() => Vacancies, (vacancy) => vacancy.application)
  vacancy?: Relation<Vacancies>;
}
