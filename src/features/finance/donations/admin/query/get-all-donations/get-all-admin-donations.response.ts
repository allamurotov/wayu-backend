import { PaymentProvider } from '@/core/enum/enum';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllAdminDonationsResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  amount!: number;

  @Expose()
  @ApiProperty()
  fullName!: string;

  @Expose()
  @ApiProperty()
  date!: string;

  @Expose()
  @ApiProperty()
  paidBy!: PaymentProvider;
}
