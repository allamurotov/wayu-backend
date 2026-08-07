import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneLanguagePublicResponse } from '@/features/common/languages/public/query/get-one-language/get-one-language.public.response';

export class GetOneLanguagePublicQuery extends Query<GetOneLanguagePublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
