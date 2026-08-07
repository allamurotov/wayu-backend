import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Applications } from '@/features/careers/application/applications.entity';
import { NotFoundException } from '@nestjs/common';
import { DeleteApplicationCommand } from '@/features/careers/application/admin/commands/delete-application/delete-application.command';

@CommandHandler(DeleteApplicationCommand)
export class DeleteApplicationHandler implements ICommandHandler<DeleteApplicationCommand> {
  async execute(command: DeleteApplicationCommand): Promise<void> {
    const exists = await Applications.findOneBy({ id: command.id });
    if (!exists) throw new NotFoundException('Application with given id not found');
    await Applications.delete({ id: command.id });
  }
}
