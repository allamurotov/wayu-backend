import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBookCommand } from '@/features/library/book/admin/command/update-book/update-book.command';
import { UpdateBookResponse } from '@/features/library/book/admin/command/update-book/update-book.response';
import { Books } from '@/features/library/book/books.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
  async execute(command: UpdateBookCommand): Promise<UpdateBookResponse> {
    const book = await Books.findOneBy({ id: command.id });
    if (!book) throw new NotFoundException('Book with given id not found');

    if (command.authorId !== undefined) book.authorId = command.authorId;

    if (command.categoryId !== undefined) book.categoryId = command.categoryId;

    if (command.title !== undefined) book.title = command.title;

    if (command.image !== undefined) book.image = command.image.path;

    if (command.file !== undefined) book.file = command.file.path;

    if (command.pages !== undefined) book.pages = command.pages;

    if (command.year !== undefined) book.year = command.year;

    if (command.description !== undefined) book.description = command.description;

    await Books.save(book);
    return plainToInstance(UpdateBookResponse, book, { excludeExtraneousValues: true });
  }
}
