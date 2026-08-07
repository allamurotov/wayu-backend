import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateInstagramPostCommand } from './create-instagram-post.command';
import { CreateInstagramPostResponse } from './create-instagram-post.response';
import { InstagramPost } from '@/features/network/instagram-posts/instagramPosts.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateInstagramPostCommand)
export class CreateInstagramPostHandler implements ICommandHandler<CreateInstagramPostCommand> {
  async execute(command: CreateInstagramPostCommand): Promise<CreateInstagramPostResponse> {
    const post = {
      image: command.image.path,
      link: command.link,
    } as InstagramPost;
    await InstagramPost.save(post);
    return plainToInstance(CreateInstagramPostResponse, post, { excludeExtraneousValues: true });
  }
}
