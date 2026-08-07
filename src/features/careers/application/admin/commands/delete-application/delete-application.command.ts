import { Command } from '@nestjs/cqrs';

export class DeleteApplicationCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}
