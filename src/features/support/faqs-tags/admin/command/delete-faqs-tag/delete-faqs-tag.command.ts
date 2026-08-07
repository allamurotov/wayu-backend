import { Command } from '@nestjs/cqrs';

export class DeleteFaqsTagCommand extends Command<void> {
  constructor(
    public faqsId: number,
    public tagId: number,
  ) {
    super();
  }
}
