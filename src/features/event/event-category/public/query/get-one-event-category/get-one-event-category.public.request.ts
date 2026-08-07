import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneEventCategoryPublicResponse } from '@/features/event/event-category/public/query/get-one-event-category/get-one-event-category.public.response';

export class GetOneEventCategoryPublicQuery extends Query<GetOneEventCategoryPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
