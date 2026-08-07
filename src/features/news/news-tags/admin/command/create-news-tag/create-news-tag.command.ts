import { Command } from '@nestjs/cqrs';
import { CreateNewsTagResponse } from '@/features/news/news-tags/admin/command/create-news-tag/create-news-tag.response';

export class CreateNewsTagCommand extends Command<CreateNewsTagResponse> {
  constructor(
    public newsId: number,
    public tagId: number,
  ) {
    super();
  }
}
