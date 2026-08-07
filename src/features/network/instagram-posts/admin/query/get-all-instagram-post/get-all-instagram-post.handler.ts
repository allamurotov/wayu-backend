import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllInstagramPostQuery } from './get-all-instagram-post.query';
import { GetAllInstagramPostResponse } from './get-all-instagram-post.response';
import { InstagramPost } from '@/features/network/instagram-posts/instagramPosts.entity';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllInstagramPostQuery)
export class GetAllInstagramPostHandler implements IQueryHandler<GetAllInstagramPostQuery> {
  async execute(query: GetAllInstagramPostQuery): Promise<GetAllInstagramPostResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const posts = await InstagramPost.find({ skip, take });
    return plainToInstance(GetAllInstagramPostResponse, posts, { excludeExtraneousValues: true });
  }
}
