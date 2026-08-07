import { Command } from '@nestjs/cqrs';
import { CreateBookCategoryResponse } from '@/features/library/book-category/admin/command/create-book-category/create-book-category.response';

export class CreateBookCategoryCommand extends Command<CreateBookCategoryResponse> {
  constructor(public title: string) {
    super();
  }
}
