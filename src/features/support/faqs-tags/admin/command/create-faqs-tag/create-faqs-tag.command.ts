import { Command } from '@nestjs/cqrs';
import { CreateFaqsTagResponse } from '@/features/support/faqs-tags/admin/command/create-faqs-tag/create-faqs-tag.response';

export class CreateFaqsTagCommand extends Command<CreateFaqsTagResponse> {
  constructor(
    public faqsId: number,
    public tagId: number,
  ) {
    super();
  }
}
