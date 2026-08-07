import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneVacancyPublicResponse } from '@/features/careers/vacancy/public/query/get-one-vacancy/get-one-vacancy.public.response';

export class GetOneVacancyPublicQuery extends Query<GetOneVacancyPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
