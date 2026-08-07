import { Command } from '@nestjs/cqrs';
import { CreateStaticInfoResponse } from '@/features/common/static-info/admin/command/create-static-info/create-static-info.response';

export class CreateStaticInfoCommand extends Command<CreateStaticInfoResponse> {
  constructor(
    public aboutUs: string,
    public appStoreLink?: string,
    public playMarketLink?: string,
  ) {
    super();
  }
}
