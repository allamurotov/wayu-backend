import { Command } from '@nestjs/cqrs';
import { UpdateBookCategoryResponse } from '@/features/library/book-category/admin/command/update-book-category/update-book-category.response';

export class UpdateBookCategoryCommand extends Command<UpdateBookCategoryResponse> {
  constructor(
    public id: number,
    public title?: string,
  ) {
    super();
  }
}
