import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SocialLinks } from '@/features/common/social-links/socialLinks.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneSocialLinkPublicQuery } from '@/features/common/social-links/public/query/get-one-social-link/get-one-social-link.public.query';
import { GetOneSocialLinkPublicResponse } from '@/features/common/social-links/public/query/get-one-social-link/get-one-social-link.public.response';

@QueryHandler(GetOneSocialLinkPublicQuery)
export class GetOneSocialLinkPublicHandler implements IQueryHandler<GetOneSocialLinkPublicQuery> {
  async execute(query: GetOneSocialLinkPublicQuery): Promise<GetOneSocialLinkPublicResponse> {
    const socialLink = await SocialLinks.findOneBy({ id: query.id });
    if (!socialLink) throw new NotFoundException('Social link with given id not found');
    return plainToInstance(GetOneSocialLinkPublicResponse, socialLink, { excludeExtraneousValues: true });
  }
}
