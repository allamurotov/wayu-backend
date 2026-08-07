import { Command } from '@nestjs/cqrs';
import { UpdateLanguageResponse } from '@/features/common/languages/admin/command/update-language/update-language.response';

export class UpdateLanguageCommand extends Command<UpdateLanguageResponse> {
  constructor(
    public id?: number,
    public title?: string,
  ) {
    super();
  }
}
