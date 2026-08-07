import { Query } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetOneSocialLinkPublicResponse } from '@/features/common/social-links/public/query/get-one-social-link/get-one-social-link.public.response';

export class GetOneSocialLinkPublicQuery extends Query<GetOneSocialLinkPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
