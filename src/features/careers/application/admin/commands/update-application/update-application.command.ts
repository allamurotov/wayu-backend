import { Command } from '@nestjs/cqrs';
import { ApplicationStatus } from '@/core/enum/enum';
import { UpdateApplicationResponse } from '@/features/careers/application/admin/commands/update-application/update-application.response';

export class UpdateApplicationCommand extends Command<UpdateApplicationResponse> {
  constructor(
    public id: number,
    public fullName?: string,
    public phoneNumber?: string,
    public email?: string,
    public vacancyId?: number,
    public resume?: Express.Multer.File,
    public status?: ApplicationStatus,
  ) {
    super();
  }
}
