import { Command } from '@nestjs/cqrs';

export class DeleteSocialLinkCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}
