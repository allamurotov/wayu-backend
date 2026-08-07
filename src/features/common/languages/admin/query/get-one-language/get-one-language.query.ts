import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneLanguageResponse } from '@/features/common/languages/admin/query/get-one-language/get-one-language.response';

export class GetOneLanguageQuery extends Query<GetOneLanguageResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
