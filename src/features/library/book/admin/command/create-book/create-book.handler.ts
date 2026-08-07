import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBookCommand } from '@/features/library/book/admin/command/create-book/create-book.command';
import { CreateBookResponse } from '@/features/library/book/admin/command/create-book/create-book.response';
import { Books } from '@/features/library/book/books.entity';
import { Authors } from '@/features/library/author/authors.entity';
import { BookCategories } from '@/features/library/book-category/bookCategories.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  async execute(command: CreateBookCommand): Promise<CreateBookResponse> {
    const authorExists = await Authors.existsBy({ id: command.authorId });

    if (!authorExists) throw new NotFoundException('Author with given id not found');

    const categoryExists = await BookCategories.existsBy({ id: command.categoryId });

    if (!categoryExists) throw new NotFoundException('Book category with given id not found');

    const book = {
      authorId: command.authorId,
      categoryId: command.categoryId,
      title: command.title,
      image: command.image.path,
      file: command.file.path,
      pages: command.pages,
      year: command.year,
      description: command.description,
    } as Books;
    await Books.save(book);
    return plainToInstance(CreateBookResponse, book, { excludeExtraneousValues: true });
  }
}
