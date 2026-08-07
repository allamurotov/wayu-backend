import { Command } from '@nestjs/cqrs';

export class DeleteUsefulLinkCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}
