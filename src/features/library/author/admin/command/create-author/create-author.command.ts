import { Command } from '@nestjs/cqrs';
import { CreateAuthorResponse } from '@/features/library/author/admin/command/create-author/create-author.response';

export class CreateAuthorCommand extends Command<CreateAuthorResponse> {
  constructor(public fullName: string) {
    super();
  }
}
