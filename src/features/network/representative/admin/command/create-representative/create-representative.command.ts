import { Command } from '@nestjs/cqrs';
import { CreateRepresentativeResponse } from '@/features/network/representative/admin/command/create-representative/create-representative.response';

export class CreateRepresentativeCommand extends Command<CreateRepresentativeResponse> {
  constructor(
    public fullName: string,
    public image: Express.Multer.File,
    public email: string,
    public phoneNumber: string,
    public resume: string,
  ) {
    super();
  }
}
