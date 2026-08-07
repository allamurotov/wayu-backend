import { Query } from '@nestjs/cqrs';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetAllRepresentativePublicResponse } from './get-all-representative.public.response';
import { GetAllRepresentativePublicFilters } from '@/features/network/representative/public/query/get-all-representative/get-all-representative.public.filters';

export class GetAllRepresentativePublicQuery extends Query<GetAllRepresentativePublicResponse[]> {
  constructor(public readonly filters: GetAllRepresentativePublicFilters) {
    super();
  }
}
