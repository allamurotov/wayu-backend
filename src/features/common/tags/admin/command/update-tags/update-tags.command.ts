import { Command } from '@nestjs/cqrs';
import { UpdateTagsResponse } from '@/features/common/tags/admin/command/update-tags/update-tags.response';

export class UpdateTagsCommand extends Command<UpdateTagsResponse> {
  constructor(
    public id?: number,
    public title?: string,
  ) {
    super();
  }
}
