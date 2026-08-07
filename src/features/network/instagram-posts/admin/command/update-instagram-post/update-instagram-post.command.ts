import { Command } from '@nestjs/cqrs';
import { UpdateInstagramPostResponse } from '@/features/network/instagram-posts/admin/command/update-instagram-post/update-instagram-post.response';

export class UpdateInstagramPostCommand extends Command<UpdateInstagramPostResponse> {
  constructor(
    public id: number,
    public image?: Express.Multer.File,
    public link?: string,
  ) {
    super();
  }
}
