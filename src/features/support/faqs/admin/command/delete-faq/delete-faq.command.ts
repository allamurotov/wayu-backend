import { Command } from '@nestjs/cqrs';

export class DeleteFaqCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}
