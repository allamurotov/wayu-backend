import { Command } from '@nestjs/cqrs';
import { CreateApplicationResponse } from '@/features/careers/application/admin/commands/create-application/create-application.response';

export class CreateApplicationCommand extends Command<CreateApplicationResponse> {
  constructor(
    public fullName: string,
    public phoneNumber: string,
    public email: string,
    public vacancyId: number,
    public resume: Express.Multer.File,
  ) {
    super();
  }
}
