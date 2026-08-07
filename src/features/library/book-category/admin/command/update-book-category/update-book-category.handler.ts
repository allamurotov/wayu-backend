import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBookCategoryCommand } from '@/features/library/book-category/admin/command/update-book-category/update-book-category.command';
import { UpdateBookCategoryResponse } from '@/features/library/book-category/admin/command/update-book-category/update-book-category.response';
import { BookCategories } from '@/features/library/book-category/bookCategories.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@CommandHandler(UpdateBookCategoryCommand)
export class UpdateBookCategoryHandler implements ICommandHandler<UpdateBookCategoryCommand> {
  async execute(command: UpdateBookCategoryCommand): Promise<UpdateBookCategoryResponse> {
    const category = await BookCategories.findOneBy({ id: command.id });

    if (!category) throw new NotFoundException('Book category with given id not found');

    if (command.title !== undefined) category.title = command.title;

    await BookCategories.save(category);
    return plainToInstance(UpdateBookCategoryResponse, category, { excludeExtraneousValues: true });
  }
}
