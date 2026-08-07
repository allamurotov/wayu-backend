import { Command } from '@nestjs/cqrs';
import { UpdateBookResponse } from '@/features/library/book/admin/command/update-book/update-book.response';

export class UpdateBookCommand extends Command<UpdateBookResponse> {
  constructor(
    public id: number,
    public authorId?: number,
    public categoryId?: number,
    public title?: string,
    public image?: Express.Multer.File,
    public file?: Express.Multer.File,
    public pages?: number,
    public year?: number,
    public description?: string,
  ) {
    super();
  }
}
