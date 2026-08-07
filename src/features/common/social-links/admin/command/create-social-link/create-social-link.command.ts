import { Command } from '@nestjs/cqrs';
import { CreateSocialLinkResponse } from '@/features/common/social-links/admin/command/create-social-link/create-social-link.response';

export class CreateSocialLinkCommand extends Command<CreateSocialLinkResponse> {
  constructor(
    public title: string,
    public icon: Express.Multer.File,
    public link: string,
  ) {
    super();
  }
}
