import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneRepresentativePublicResponse } from './get-one-representative.public.response';

export class GetOneRepresentativePublicQuery extends Query<GetOneRepresentativePublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
