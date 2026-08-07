import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneSocialLinkResponse } from '@/features/common/social-links/admin/query/get-one-social-link/get-one-social-link.response';

export class GetOneSocialLinkQuery extends Query<GetOneSocialLinkResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
