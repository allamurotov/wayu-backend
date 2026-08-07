import { Command } from '@nestjs/cqrs';
import { CreateFaqResponse } from '@/features/support/faqs/admin/command/create-faq/create-faq.response';

export class CreateFaqCommand extends Command<CreateFaqResponse> {
  constructor(
    public question: string,
    public answer: string,
  ) {
    super();
  }
}
