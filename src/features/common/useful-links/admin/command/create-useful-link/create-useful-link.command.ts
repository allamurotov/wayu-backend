import { Command } from '@nestjs/cqrs';
import { CreateUsefulLinkResponse } from '@/features/common/useful-links/admin/command/create-useful-link/create-useful-link.response';

export class CreateUsefulLinkCommand extends Command<CreateUsefulLinkResponse> {
  constructor(
    public title: string,
    public icon: Express.Multer.File,
    public link: string,
  ) {
    super();
  }
}
