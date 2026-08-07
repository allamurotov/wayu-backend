import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateStaticInfoCommand } from '@/features/common/static-info/admin/command/update-static-info/update-static-info.command';
import { UpdateStaticInfoResponse } from '@/features/common/static-info/admin/command/update-static-info/update-static-info.response';
import { StaticInfo } from '@/features/common/static-info/staticInfo.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@CommandHandler(UpdateStaticInfoCommand)
export class UpdateStaticInfoHandler implements ICommandHandler<UpdateStaticInfoCommand> {
  async execute(command: UpdateStaticInfoCommand): Promise<UpdateStaticInfoResponse> {
    const staticInfo = await StaticInfo.findOneBy({ id: command.id });

    if (!staticInfo) throw new NotFoundException('Static info with given id not found');

    if (command.aboutUs !== undefined) staticInfo.aboutUs = command.aboutUs;
    if (command.appStoreLink !== undefined) staticInfo.appStoreLink = command.appStoreLink;
    if (command.playMarketLink !== undefined) staticInfo.playMarketLink = command.playMarketLink;

    await StaticInfo.save(staticInfo);
    return plainToInstance(UpdateStaticInfoResponse, staticInfo, { excludeExtraneousValues: true });
  }
}
