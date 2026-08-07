import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneApplicationPublicResponse } from '@/features/careers/application/public/query/get-one-application/get-one-application.public.response';

export class GetOneApplicationPublicQuery extends Query<GetOneApplicationPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
