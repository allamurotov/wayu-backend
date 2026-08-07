import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteFaqCommand } from '@/features/support/faqs/admin/command/delete-faq/delete-faq.command';
import { Faqs } from '@/features/support/faqs/faqs.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteFaqCommand)
export class DeleteFaqHandler implements ICommandHandler<DeleteFaqCommand> {
  async execute(command: DeleteFaqCommand): Promise<void> {
    const exists = await Faqs.existsBy({ id: command.id });

    if (!exists) throw new NotFoundException('FAQ with given id not found');

    await Faqs.delete({ id: command.id });
  }
}
