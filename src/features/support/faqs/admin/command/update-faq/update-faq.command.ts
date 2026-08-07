import { Command } from '@nestjs/cqrs';
import { UpdateFaqResponse } from '@/features/support/faqs/admin/command/update-faq/update-faq.response';

export class UpdateFaqCommand extends Command<UpdateFaqResponse> {
  constructor(
    public id: number,
    public question?: string,
    public answer?: string,
  ) {
    super();
  }
}
