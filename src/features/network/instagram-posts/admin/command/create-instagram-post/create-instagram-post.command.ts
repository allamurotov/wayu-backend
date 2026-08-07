import { Command } from '@nestjs/cqrs';
import { CreateInstagramPostResponse } from '@/features/network/instagram-posts/admin/command/create-instagram-post/create-instagram-post.response';

export class CreateInstagramPostCommand extends Command<CreateInstagramPostResponse> {
  constructor(
    public image: Express.Multer.File,
    public link: string,
  ) {
    super();
  }
}
