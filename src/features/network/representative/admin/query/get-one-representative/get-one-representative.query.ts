import { Query } from '@nestjs/cqrs';
import { GetOneRepresentativeResponse } from './get-one-representative.response';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetOneRepresentativeQuery extends Query<GetOneRepresentativeResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
