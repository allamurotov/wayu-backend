import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SocialLinks } from '@/features/common/social-links/socialLinks.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllSocialLinkPublicQuery } from '@/features/common/social-links/public/query/get-all-social-link/get-all-social-link.public.query';
import { GetAllSocialLinkPublicResponse } from '@/features/common/social-links/public/query/get-all-social-link/get-all-social-link.public.response';

@QueryHandler(GetAllSocialLinkPublicQuery)
export class GetAllSocialLinkPublicHandler implements IQueryHandler<GetAllSocialLinkPublicQuery> {
  async execute(query: GetAllSocialLinkPublicQuery): Promise<GetAllSocialLinkPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const socialLinks = await SocialLinks.find({ skip: skip, take: take });
    return plainToInstance(GetAllSocialLinkPublicResponse, socialLinks, { excludeExtraneousValues: true });
  }
}
