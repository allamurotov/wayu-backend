import { Command } from '@nestjs/cqrs';

export class DeleteAdminDonationsCommand extends Command<void> {
  constructor(public readonly id: number) {
    super();
  }
}
