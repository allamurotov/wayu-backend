import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBookCategoryCommand } from '@/features/library/book-category/admin/command/create-book-category/create-book-category.command';
import { CreateBookCategoryResponse } from '@/features/library/book-category/admin/command/create-book-category/create-book-category.response';
import { BookCategories } from '@/features/library/book-category/bookCategories.entity';
import { BadRequestException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateBookCategoryCommand)
export class CreateBookCategoryHandler implements ICommandHandler<CreateBookCategoryCommand> {
  async execute(command: CreateBookCategoryCommand): Promise<CreateBookCategoryResponse> {
    const alreadyExists = await BookCategories.existsBy({ title: ILike(command.title) });

    if (alreadyExists) throw new BadRequestException('Book category already exists');

    const category = BookCategories.create({ title: command.title } as BookCategories);
    await BookCategories.save(category);
    return plainToInstance(CreateBookCategoryResponse, category, { excludeExtraneousValues: true });
  }
}
