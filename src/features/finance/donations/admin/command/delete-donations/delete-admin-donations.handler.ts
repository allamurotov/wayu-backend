import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAdminDonationsCommand } from '@/features/finance/donations/admin/command/delete-donations/delete-admin-donations.command';
import { Donations } from '@/features/finance/donations/donations.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteAdminDonationsCommand)
export class DeleteAdminDonationsHandler implements ICommandHandler<DeleteAdminDonationsCommand> {
  async execute(command: DeleteAdminDonationsCommand): Promise<void> {
    const donations = await Donations.findOneBy({ id: command.id });
    if (!donations) {
      throw new NotFoundException('donations with given id not found');
    }

    await Donations.remove(donations);
  }
}
