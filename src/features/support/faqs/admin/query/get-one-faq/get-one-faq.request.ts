import { Query } from '@nestjs/cqrs';
import { GetOneFaqResponse } from '@/features/support/faqs/admin/query/get-one-faq/get-one-faq.response';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetOneFaqQuery extends Query<GetOneFaqResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
