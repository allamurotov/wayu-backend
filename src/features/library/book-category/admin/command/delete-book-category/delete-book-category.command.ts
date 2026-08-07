import { Command } from '@nestjs/cqrs';

export class DeleteBookCategoryCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}
