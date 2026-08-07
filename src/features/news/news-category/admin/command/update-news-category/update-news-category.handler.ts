import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateNewsCategoryCommand } from './update-news-category.command';
import { UpdateNewsCategoryResponse } from './update-news-category.response';
import { NewsCategories } from '@/features/news/news-category/news-category.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@CommandHandler(UpdateNewsCategoryCommand)
export class UpdateNewsCategoryHandler implements ICommandHandler<UpdateNewsCategoryCommand> {
  async execute(command: UpdateNewsCategoryCommand): Promise<UpdateNewsCategoryResponse> {
    const newsCategory = await NewsCategories.findOneBy({ id: command.id });
    if (!newsCategory) {
      throw new NotFoundException('category with given id not found');
    }

    Object.assign(newsCategory, Object.fromEntries(Object.entries(command).filter(([key, value]) => value)));

    await NewsCategories.save(newsCategory);
    return plainToInstance(UpdateNewsCategoryResponse, newsCategory, { excludeExtraneousValues: true });
  }
}
