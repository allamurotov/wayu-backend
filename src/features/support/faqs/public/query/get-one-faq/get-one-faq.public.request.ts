import { Query } from '@nestjs/cqrs';
import { GetOneFaqResponse } from '@/features/support/faqs/admin/query/get-one-faq/get-one-faq.response';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneFaqPublicResponse } from '@/features/support/faqs/public/query/get-one-faq/get-one-faq.public.response';

export class GetOneFaqPublicQuery extends Query<GetOneFaqPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
