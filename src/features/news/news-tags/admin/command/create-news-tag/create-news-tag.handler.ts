import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewsTagCommand } from '@/features/news/news-tags/admin/command/create-news-tag/create-news-tag.command';
import { CreateNewsTagResponse } from '@/features/news/news-tags/admin/command/create-news-tag/create-news-tag.response';
import { News } from '@/features/news/news/news.entity';
import { Tags } from '@/features/common/tags/tags.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(CreateNewsTagCommand)
export class CreateNewsTagHandler implements ICommandHandler<CreateNewsTagCommand> {
  async execute(cmd: CreateNewsTagCommand): Promise<CreateNewsTagResponse> {
    const news = await News.findOne({ where: { id: cmd.newsId }, relations: ['tags'] });
    if (!news) throw new NotFoundException('News with given id not found');

    const tag = await Tags.findOneBy({ id: cmd.tagId });
    if (!tag) throw new NotFoundException('Tag with given id not found');
    news.tags.push(tag);
    await News.save(news);
    return { newsId: news.id, tagId: tag.id };
  }
}
