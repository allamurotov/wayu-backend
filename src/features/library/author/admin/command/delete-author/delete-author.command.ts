import { Command } from '@nestjs/cqrs';

export class DeleteAuthorCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}
