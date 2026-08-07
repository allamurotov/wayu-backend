import { Command } from '@nestjs/cqrs';
import { CreatePublicDonationsResponse } from '@/features/finance/donations/public/command/create-donations/create-public-donations.response';
import { PaymentProvider } from '@/core/enum/enum';

export class CreatePublicDonationCommand extends Command<CreatePublicDonationsResponse> {
  constructor(
    public amount: number,
    public fullName: string,
    public date: string,
    public paidBy: PaymentProvider,
  ) {
    super();
  }
}
