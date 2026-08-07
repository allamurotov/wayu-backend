import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllInstagramPostsPublicQuery } from './get-all-instagram-posts.public.query';
import { GetAllInstagramPostsPublicResponse } from './get-all-instagram-posts.public.response';
import { InstagramPost } from '@/features/network/instagram-posts/instagramPosts.entity';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllInstagramPostsPublicQuery)
export class GetAllInstagramPostsPublicHandler implements IQueryHandler<GetAllInstagramPostsPublicQuery> {
  async execute(query: GetAllInstagramPostsPublicQuery): Promise<GetAllInstagramPostsPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = query.filters?.page ? (currentPage - 1) * take : 0;

    const instagramPosts = await InstagramPost.find({
      take,
      skip,
      order: { createdAt: 'DESC' },
    });

    return plainToInstance(GetAllInstagramPostsPublicResponse, instagramPosts, { excludeExtraneousValues: true });
  }
}
