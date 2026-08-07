import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewsResponse } from '@/features/news/news/admin/command/create-news/create-news.response';
import { News } from '@/features/news/news/news.entity';
import { plainToInstance } from 'class-transformer';
import { CreateNewsCommand } from '@/features/news/news/admin/command/create-news/create-news.command';
import { NotFoundException } from '@nestjs/common';
import { NewsCategories } from '@/features/news/news-category/news-category.entity';

@CommandHandler(CreateNewsCommand)
export class CreateNewsHandler implements ICommandHandler<CreateNewsCommand> {
  async execute(command: CreateNewsCommand): Promise<CreateNewsResponse> {
    const categoryExists = await NewsCategories.existsBy({ id: command.categoryId });
    if (!categoryExists) {
      throw new NotFoundException('Category with given id not found');
    }

    const news = {
      categoryId: command.categoryId,
      countryId: command.countryId,
      title: command.title,
      image: command.image.path,
      date: command.date,
      content: command.content,
    } as News;
    await News.save(news);
    return plainToInstance(CreateNewsResponse, news, { excludeExtraneousValues: true });
  }
}
