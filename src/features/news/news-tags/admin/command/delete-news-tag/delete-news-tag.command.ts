import { Command } from '@nestjs/cqrs';

export class DeleteNewsTagCommand extends Command<void> {
  constructor(
    public newsId: number,
    public tagId: number,
  ) {
    super();
  }
}
