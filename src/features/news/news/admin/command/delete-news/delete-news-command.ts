import { Command } from '@nestjs/cqrs';
import { DeleteNewsResponse } from '@/features/news/news/admin/command/delete-news/delete-news.response';

export class DeleteNewsCommand extends Command<void> {
  constructor(public id: number) {
    super();
  }
}
