import { Command } from '@nestjs/cqrs';

export class DeleteRepresentativeCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}
