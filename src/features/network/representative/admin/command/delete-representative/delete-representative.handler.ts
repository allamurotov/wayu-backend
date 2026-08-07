import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRepresentativeCommand } from './delete-representative.command';
import { Representatives } from '@/features/network/representative/representatives.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteRepresentativeCommand)
export class DeleteRepresentativeHandler implements ICommandHandler<DeleteRepresentativeCommand> {
  async execute(cmd: DeleteRepresentativeCommand): Promise<void> {
    const representative = await Representatives.findOneBy({ id: cmd.id });
    if (!representative) {
      throw new NotFoundException('Representative with given id not found');
    }
    await Representatives.delete(cmd.id);
  }
}
