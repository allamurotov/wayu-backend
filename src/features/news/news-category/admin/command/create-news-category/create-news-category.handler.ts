import { BadRequestException } from '@nestjs/common';
import { CreateNewsCategoryResponse } from '@/features/news/news-category/admin/command/create-news-category/create-news-category.response';
import { CreateNewsCategoryCommands } from '@/features/news/news-category/admin/command/create-news-category/create-news-category.commands';
import { ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { NewsCategories } from '@/features/news/news-category/news-category.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateNewsCategoryCommands)
export class CreateNewsCategoryHandler implements ICommandHandler<CreateNewsCategoryCommands> {
  async execute(command: CreateNewsCategoryCommands): Promise<CreateNewsCategoryResponse> {
    const alreadyExists = await NewsCategories.existsBy({ title: ILike(command.title) });

    if (alreadyExists) throw new BadRequestException('Category already exists');

    const newsCategory = NewsCategories.create({ title: command.title } as NewsCategories);
    await NewsCategories.save(newsCategory);
    return plainToInstance(CreateNewsCategoryResponse, newsCategory, { excludeExtraneousValues: true });
  }
}
