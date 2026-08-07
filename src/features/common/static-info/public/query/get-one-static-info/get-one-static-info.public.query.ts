import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneStaticInfoPublicResponse } from '@/features/common/static-info/public/query/get-one-static-info/get-one-static-info.public.response';

export class GetOneStaticInfoPublicQuery extends Query<GetOneStaticInfoPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
