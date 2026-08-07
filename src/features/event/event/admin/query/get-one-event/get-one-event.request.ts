import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneEventResponse } from '@/features/event/event/admin/query/get-one-event/get-one-event.response';

export class GetOneEventQuery extends Query<GetOneEventResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
