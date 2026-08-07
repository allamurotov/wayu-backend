import { Command } from '@nestjs/cqrs';

export class DeleteCountryCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}
