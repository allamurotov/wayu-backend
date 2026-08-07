import { Query } from '@nestjs/cqrs';
import { GetOneStaticInfoResponse } from '@/features/common/static-info/admin/query/get-one-static-info/get-one-static-info.response';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetOneStaticInfoQuery extends Query<GetOneStaticInfoResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
