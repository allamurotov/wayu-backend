import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneInstagramPostQuery } from './get-one-instagram-post.query';
import { GetOneInstagramPostResponse } from './get-one-instagram-post.response';
import { InstagramPost } from '@/features/network/instagram-posts/instagramPosts.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneInstagramPostQuery)
export class GetOneInstagramPostHandler implements IQueryHandler<GetOneInstagramPostQuery> {
  async execute(query: GetOneInstagramPostQuery): Promise<GetOneInstagramPostResponse> {
    const post = await InstagramPost.findOneBy({ id: query.id });

    if (!post) throw new NotFoundException('Instagram post with given id not found');

    return plainToInstance(GetOneInstagramPostResponse, post, { excludeExtraneousValues: true });
  }
}
