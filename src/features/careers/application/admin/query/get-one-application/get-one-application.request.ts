import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneApplicationResponse } from '@/features/careers/application/admin/query/get-one-application/get-one-application.response';

export class GetOneApplicationQuery extends Query<GetOneApplicationResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
