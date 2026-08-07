import { Command } from '@nestjs/cqrs';

export class DeleteVacancyCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}
