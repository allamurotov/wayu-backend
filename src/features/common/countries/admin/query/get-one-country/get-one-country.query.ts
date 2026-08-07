import { Query } from '@nestjs/cqrs';
import { GetOneCountryResponse } from '@/features/common/countries/admin/query/get-one-country/get-one-country.response';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetOneCountryQuery extends Query<GetOneCountryResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
