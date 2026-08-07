import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteInstagramPostCommand } from './delete-instagram-post.command';
import { InstagramPost } from '@/features/network/instagram-posts/instagramPosts.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteInstagramPostCommand)
export class DeleteInstagramPostHandler implements ICommandHandler<DeleteInstagramPostCommand> {
  async execute(cmd: DeleteInstagramPostCommand): Promise<void> {
    const post = await InstagramPost.findOneBy({ id: cmd.id });

    if (!post) throw new NotFoundException('Instagram post with given id not found');

    await InstagramPost.delete(cmd.id);
  }
}
