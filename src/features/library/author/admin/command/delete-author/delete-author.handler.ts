import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAuthorCommand } from '@/features/library/author/admin/command/delete-author/delete-author.command';
import { Authors } from '@/features/library/author/authors.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteAuthorCommand)
export class DeleteAuthorHandler implements ICommandHandler<DeleteAuthorCommand> {
  async execute(cmd: DeleteAuthorCommand): Promise<void> {
    const author = await Authors.findOneBy({ id: cmd.id });

    if (!author) throw new NotFoundException('Author with given id not found');

    await Authors.delete(cmd.id);
  }
}
