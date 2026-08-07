import { Command } from '@nestjs/cqrs';

export class DeleteQuestionCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}
