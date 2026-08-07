import { Command } from '@nestjs/cqrs';
import { UpdateUsefulLinkResponse } from '@/features/common/useful-links/admin/command/update-useful-link/update-useful-link.response';

export class UpdateUsefulLinkCommand extends Command<UpdateUsefulLinkResponse> {
  constructor(
    public id?: number,
    public title?: string,
    public icon?: Express.Multer.File,
    public link?: string,
  ) {
    super();
  }
}
