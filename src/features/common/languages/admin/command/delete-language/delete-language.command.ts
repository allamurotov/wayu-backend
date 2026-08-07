import { Command } from '@nestjs/cqrs';

export class DeleteLanguageCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}
