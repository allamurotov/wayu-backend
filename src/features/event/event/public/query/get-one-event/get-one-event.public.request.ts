import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneEventPublicResponse } from '@/features/event/event/public/query/get-one-event/get-one-event.public.response';

export class GetOneEventPublicQuery extends Query<GetOneEventPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
