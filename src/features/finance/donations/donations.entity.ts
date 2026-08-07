import { Column, Entity } from 'typeorm';
import { BaseModel } from '@/core/base-model';
import { PaymentProvider } from '@/core/enum/enum';

@Entity('donations')
export class Donations extends BaseModel {
  @Column()
  amount!: number;

  @Column({ type: 'varchar', length: 64 })
  fullName!: string;

  @Column({ type: 'varchar' })
  date!: string;

  @Column({ type: 'enum', enum: PaymentProvider })
  paidBy!: PaymentProvider;
}
