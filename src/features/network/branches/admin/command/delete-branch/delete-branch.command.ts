import { Command } from '@nestjs/cqrs';

export class DeleteBranchCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}
