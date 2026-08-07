import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneVacancyResponse } from '@/features/careers/vacancy/admin/query/get-one-vacancy/get-one-vacancy.response';

export class GetOneVacancyQuery extends Query<GetOneVacancyResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
