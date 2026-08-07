import { Command } from '@nestjs/cqrs';

export class DeleteStaticInfoCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}
