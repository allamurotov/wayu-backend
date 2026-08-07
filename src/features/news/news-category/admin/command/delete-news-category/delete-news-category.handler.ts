import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteNewsCategoryCommand } from '@/features/news/news-category/admin/command/delete-news-category/delete-news-category.command';
import { NewsCategories } from '@/features/news/news-category/news-category.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { News } from '@/features/news/news/news.entity';

@CommandHandler(DeleteNewsCategoryCommand)
export class DeleteNewsCategoryHandler implements ICommandHandler<DeleteNewsCategoryCommand> {
  async execute(cmd: DeleteNewsCategoryCommand): Promise<void> {
    const category = await NewsCategories.findOneBy({ id: cmd.id });
    if (!category) {
      throw new NotFoundException('category with given id not found');
    }

    const hasAnyAttachedNews = await News.existsBy({ categoryId: cmd.id });
    if (hasAnyAttachedNews) {
      throw new BadRequestException('Category has attached News,move or delete them first');
    }

    await NewsCategories.remove(category);
  }
}
