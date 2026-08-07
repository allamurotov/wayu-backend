import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateStaticInfoCommand } from '@/features/common/static-info/admin/command/create-static-info/create-static-info.command';
import { CreateStaticInfoResponse } from '@/features/common/static-info/admin/command/create-static-info/create-static-info.response';
import { StaticInfo } from '@/features/common/static-info/staticInfo.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateStaticInfoCommand)
export class CreateStaticInfoHandler implements ICommandHandler<CreateStaticInfoCommand> {
  async execute(command: CreateStaticInfoCommand): Promise<CreateStaticInfoResponse> {
    const staticInfo = {
      aboutUs: command.aboutUs,
      appStoreLink: command.appStoreLink,
      playMarketLink: command.playMarketLink,
    } as StaticInfo;
    await StaticInfo.save(staticInfo);
    return plainToInstance(CreateStaticInfoResponse, staticInfo, { excludeExtraneousValues: true });
  }
}
