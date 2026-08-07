import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteUsefulLinkCommand } from '@/features/common/useful-links/admin/command/delete-useful-link/delete-useful-link.command';
import { UsefulLinks } from '@/features/common/useful-links/usefulLinks.entity';

@CommandHandler(DeleteUsefulLinkCommand)
export class DeleteUsefulLinkHandler implements ICommandHandler<DeleteUsefulLinkCommand> {
  async execute(cmd: DeleteUsefulLinkCommand): Promise<void> {
    const usefulLink = await UsefulLinks.findOneBy({ id: cmd.id });
    if (!usefulLink) {
      throw new NotFoundException('link with given if not found');
    }

    await UsefulLinks.remove(usefulLink);
  }
}
