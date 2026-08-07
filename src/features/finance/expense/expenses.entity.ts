import { Column, Entity } from 'typeorm';
import { BaseModel } from '@/core/base-model';

@Entity('expenses')
export class Expenses extends BaseModel {
  @Column()
  amount!: number;

  @Column({ type: 'date' })
  date!: string;

  @Column({ type: 'varchar', length: 256 })
  title!: string;

  @Column({ type: 'text' })
  description?: string;

  @Column({ type: 'varchar', length: '64', unique: true })
  transactionId!: string;
}
