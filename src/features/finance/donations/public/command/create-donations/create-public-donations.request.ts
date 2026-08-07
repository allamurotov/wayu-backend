import { PaymentProvider } from '@/core/enum/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreatePublicDonationsRequest {
  @IsNumber()
  @ApiProperty()
  amount!: number;

  @IsString()
  @MaxLength(64)
  @ApiProperty()
  fullName!: string;

  @IsDateString()
  @ApiProperty()
  date!: string;

  @IsEnum(PaymentProvider)
  @ApiProperty()
  paidBy!: PaymentProvider;
}
