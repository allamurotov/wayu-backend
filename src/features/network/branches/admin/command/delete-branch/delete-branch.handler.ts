import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBranchCommand } from './delete-branch.command';
import { Branches } from '@/features/network/branches/branches.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteBranchCommand)
export class DeleteBranchHandler implements ICommandHandler<DeleteBranchCommand> {
  async execute(cmd: DeleteBranchCommand): Promise<void> {
    const branch = await Branches.findOneBy({ id: cmd.id });

    if (!branch) throw new NotFoundException('Branch with given id not found');

    await Branches.delete(cmd.id);
  }
}
