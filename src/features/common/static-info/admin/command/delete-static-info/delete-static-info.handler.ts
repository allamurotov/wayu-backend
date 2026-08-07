import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteStaticInfoCommand } from '@/features/common/static-info/admin/command/delete-static-info/delete-static-info.command';
import { StaticInfo } from '@/features/common/static-info/staticInfo.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteStaticInfoCommand)
export class DeleteStaticInfoHandler implements ICommandHandler<DeleteStaticInfoCommand> {
  async execute(cmd: DeleteStaticInfoCommand): Promise<void> {
    const staticInfo = await StaticInfo.findOneBy({ id: cmd.id });

    if (!staticInfo) throw new NotFoundException('Static info with given id not found');

    await StaticInfo.delete(cmd.id);
  }
}
