import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePublicDonationCommand } from '@/features/finance/donations/public/command/create-donations/create-public-donation.command';
import { CreatePublicDonationsResponse } from '@/features/finance/donations/public/command/create-donations/create-public-donations.response';
import { Donations } from '@/features/finance/donations/donations.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreatePublicDonationCommand)
export class CreatePublicDonationsHandler implements ICommandHandler<CreatePublicDonationCommand> {
  async execute(command: CreatePublicDonationCommand): Promise<CreatePublicDonationsResponse> {
    const donations = Donations.create({
      amount: command.amount,
      fullName: command.fullName,
      date: command.date,
      paidBy: command.paidBy,
    });

    await Donations.save(donations);
    return plainToInstance(CreatePublicDonationsResponse, donations, { excludeExtraneousValues: true });
  }
}
