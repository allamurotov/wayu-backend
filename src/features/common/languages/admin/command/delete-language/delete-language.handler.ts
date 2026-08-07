import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteNewsCategoryCommand } from '@/features/news/news-category/admin/command/delete-news-category/delete-news-category.command';
import { NewsCategories } from '@/features/news/news-category/news-category.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { News } from '@/features/news/news/news.entity';
import { DeleteLanguageCommand } from '@/features/common/languages/admin/command/delete-language/delete-language.command';
import { Languages } from '@/features/common/languages/languages.entity';

@CommandHandler(DeleteLanguageCommand)
export class DeleteLanguageHandler implements ICommandHandler<DeleteLanguageCommand> {
  async execute(cmd: DeleteLanguageCommand): Promise<void> {
    const language = await Languages.findOneBy({ id: cmd.id });
    if (!language) {
      throw new NotFoundException('language with given id not found');
    }

    await Languages.remove(language);
  }
}
