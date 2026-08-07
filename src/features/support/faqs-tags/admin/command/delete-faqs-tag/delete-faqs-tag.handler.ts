import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteNewsTagCommand } from '@/features/news/news-tags/admin/command/delete-news-tag/delete-news-tag.command';
import { DeleteFaqsTagCommand } from '@/features/support/faqs-tags/admin/command/delete-faqs-tag/delete-faqs-tag.command';
import { News } from '@/features/news/news/news.entity';
import { NotFoundException } from '@nestjs/common';
import { Tags } from '@/features/common/tags/tags.entity';
import { Faqs } from '@/features/support/faqs/faqs.entity';

@CommandHandler(DeleteFaqsTagCommand)
export class DeleteFaqsTagHandler implements ICommandHandler<DeleteFaqsTagCommand> {
  async execute(cmd: DeleteFaqsTagCommand): Promise<void> {
    const faqs = await Faqs.findOne({ relations: ['tags'], where: { id: cmd.faqsId } });
    if (!faqs) throw new NotFoundException('faqs with given id not found');

    const tag = await Tags.findOneBy({ id: cmd.tagId });
    if (!tag) throw new NotFoundException('tag with given if not found');

    faqs.tags = faqs.tags.filter((x) => x.id !== tag.id);
    await Faqs.save(faqs);
  }
}
