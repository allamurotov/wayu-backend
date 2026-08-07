import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllSocialLinkQuery } from '@/features/common/social-links/admin/query/get-all-social-link/get-all-social-link.query';
import { GetAllSocialLinkResponse } from '@/features/common/social-links/admin/query/get-all-social-link/get-all-social-link.response';
import { SocialLinks } from '@/features/common/social-links/socialLinks.entity';

@QueryHandler(GetAllSocialLinkQuery)
export class GetAllSocialLinkHandler implements IQueryHandler<GetAllSocialLinkQuery> {
  async execute(query: GetAllSocialLinkQuery): Promise<GetAllSocialLinkResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const links = await SocialLinks.find({ skip: skip, take: take });
    return plainToInstance(GetAllSocialLinkResponse, links, { excludeExtraneousValues: true });
  }
}
