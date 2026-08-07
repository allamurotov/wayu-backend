import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBookCategoryCommand } from '@/features/library/book-category/admin/command/delete-book-category/delete-book-category.command';
import { BookCategories } from '@/features/library/book-category/bookCategories.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteBookCategoryCommand)
export class DeleteBookCategoryHandler implements ICommandHandler<DeleteBookCategoryCommand> {
  async execute(cmd: DeleteBookCategoryCommand): Promise<void> {
    const category = await BookCategories.findOneBy({ id: cmd.id });

    if (!category) throw new NotFoundException('Book category with given id not found');

    await BookCategories.delete(cmd.id);
  }
}
