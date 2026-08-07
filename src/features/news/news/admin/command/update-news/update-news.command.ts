import { Command } from '@nestjs/cqrs';
import { UpdateNewsResponse } from '@/features/news/news/admin/command/update-news/update-news.response';

export class UpdateNewsCommand extends Command<UpdateNewsResponse> {
  constructor(
    public id?: number,
    public title?: string,
    public image?: Express.Multer.File,
    public date?: string,
    public content?: string,
  ) {
    super();
  }
}
