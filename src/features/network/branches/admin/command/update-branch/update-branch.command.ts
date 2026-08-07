import { Command } from '@nestjs/cqrs';
import { UpdateBranchResponse } from '@/features/network/branches/admin/command/update-branch/update-branch.response';

export class UpdateBranchCommand extends Command<UpdateBranchResponse> {
  constructor(
    public id: number,
    public countryId?: number,
    public representativeId?: number,
    public city?: string,
    public latitude?: number,
    public longitude?: number,
    public phoneNumber?: string,
  ) {
    super();
  }
}
