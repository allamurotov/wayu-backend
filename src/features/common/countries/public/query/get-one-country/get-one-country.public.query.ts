import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneCountryPublicResponse } from '@/features/common/countries/public/query/get-one-country/get-one-country.public.response';

export class GetOneCountryPublicQuery extends Query<GetOneCountryPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
