import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateInstagramPostCommand } from './update-instagram-post.command';
import { UpdateInstagramPostResponse } from './update-instagram-post.response';
import { InstagramPost } from '@/features/network/instagram-posts/instagramPosts.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@CommandHandler(UpdateInstagramPostCommand)
export class UpdateInstagramPostHandler implements ICommandHandler<UpdateInstagramPostCommand> {
  async execute(command: UpdateInstagramPostCommand): Promise<UpdateInstagramPostResponse> {
    const post = await InstagramPost.findOneBy({ id: command.id });

    if (!post) throw new NotFoundException('Instagram post with given id not found');

    if (command.image !== undefined) post.image = command.image.path;
    if (command.link !== undefined) post.link = command.link;

    await InstagramPost.save(post);
    return plainToInstance(UpdateInstagramPostResponse, post, { excludeExtraneousValues: true });
  }
}
