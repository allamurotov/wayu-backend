import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateNewsResponse } from '@/features/news/news/admin/command/update-news/update-news.response';
import { News } from '@/features/news/news/news.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UpdateNewsCommand } from '@/features/news/news/admin/command/update-news/update-news.command';

@CommandHandler(UpdateNewsCommand)
export class UpdateNewsHandler implements ICommandHandler<UpdateNewsCommand> {
  async execute(command: UpdateNewsCommand): Promise<UpdateNewsResponse> {
    const news = await News.findOneBy({ id: command.id });
    if (!news) {
      throw new NotFoundException('news with given id not found');
    }

    if (command.title !== undefined) news.title = command.title;
    if (command.image !== undefined) news.image = command.image.path;
    if (command.date !== undefined) news.date = command.date;
    if (command.content !== undefined) news.content = command.content;

    await News.save(news);
    return plainToInstance(UpdateNewsResponse, news, { excludeExtraneousValues: true });
  }
}
