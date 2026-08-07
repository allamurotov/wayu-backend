import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneInstagramPostPublicQuery } from './get-one-instagram-post.public.query';
import { GetOneInstagramPostPublicResponse } from './get-one-instagram-post.public.response';
import { InstagramPost } from '@/features/network/instagram-posts/instagramPosts.entity';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOneInstagramPostPublicQuery)
export class GetOneInstagramPostPublicHandler implements IQueryHandler<GetOneInstagramPostPublicQuery> {
  async execute(query: GetOneInstagramPostPublicQuery): Promise<GetOneInstagramPostPublicResponse> {
    const instagramPost = await InstagramPost.findOneBy({ id: query.id });

    if (!instagramPost) {
      throw new NotFoundException('Instagram post not found');
    }

    return plainToInstance(GetOneInstagramPostPublicResponse, instagramPost, { excludeExtraneousValues: true });
  }
}
