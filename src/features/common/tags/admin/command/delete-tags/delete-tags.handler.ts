import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteTagsCommand } from '@/features/common/tags/admin/command/delete-tags/delete-tags.command';
import { Tags } from '@/features/common/tags/tags.entity';

@CommandHandler(DeleteTagsCommand)
export class DeleteTagsHandler implements ICommandHandler<DeleteTagsCommand> {
  async execute(cmd: DeleteTagsCommand): Promise<void> {
    const tags = await Tags.findOneBy({ id: cmd.id });
    if (!tags) {
      throw new NotFoundException('tags with given id not found');
    }

    await Tags.delete({ id: cmd.id });
  }
}
