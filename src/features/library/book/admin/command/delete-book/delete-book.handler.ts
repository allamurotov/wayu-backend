import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBookCommand } from '@/features/library/book/admin/command/delete-book/delete-book.command';
import { Books } from '@/features/library/book/books.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteBookCommand)
export class DeleteBookHandler implements ICommandHandler<DeleteBookCommand> {
  async execute(command: DeleteBookCommand): Promise<void> {
    const exists = await Books.existsBy({ id: command.id });

    if (!exists) throw new NotFoundException('Book with given id not found');

    await Books.delete({ id: command.id });
  }
}
