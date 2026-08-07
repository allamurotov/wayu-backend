import { Command } from '@nestjs/cqrs';

export class DeleteBookCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}
