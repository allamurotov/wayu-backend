import { Command } from '@nestjs/cqrs';
import { UpdateSocialLinkResponse } from '@/features/common/social-links/admin/command/update-social-link/update-social-link.response';

export class UpdateSocialLinkCommand extends Command<UpdateSocialLinkResponse> {
  constructor(
    public id?: number,
    public title?: string,
    public icon?: Express.Multer.File,
    public link?: string,
  ) {
    super();
  }
}
