import { Command } from '@nestjs/cqrs';
import { UpdateRepresentativeResponse } from '@/features/network/representative/admin/command/update-representative/update-representative.response';

export class UpdateRepresentativeCommand extends Command<UpdateRepresentativeResponse> {
  constructor(
    public id: number,
    public fullName?: string,
    public image?: Express.Multer.File,
    public email?: string,
    public phoneNumber?: string,
    public resume?: string,
  ) {
    super();
  }
}
