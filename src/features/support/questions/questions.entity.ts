import { Column, Entity } from 'typeorm';
import { BaseModel } from '@/core/base-model';
import { QuestionStatus } from '@/core/enum/enum';

@Entity('questions')
export class Questions extends BaseModel {
  @Column({ type: 'varchar', length: 64 })
  fullName!: string;

  @Column({ type: 'varchar', length: 16 })
  phoneNumber!: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 2000 })
  questions!: string;

  @Column({ type: 'enum', enum: QuestionStatus })
  status!: QuestionStatus;
}
