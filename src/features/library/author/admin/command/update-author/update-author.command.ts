import { Command } from '@nestjs/cqrs';
import { UpdateAuthorResponse } from '@/features/library/author/admin/command/update-author/update-author.response';

export class UpdateAuthorCommand extends Command<UpdateAuthorResponse> {
  constructor(
    public id: number,
    public fullName?: string,
  ) {
    super();
  }
}
