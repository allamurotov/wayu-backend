import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { News } from '@/features/news/news/news.entity';
import { Tags } from '@/features/common/tags/tags.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateFaqsTagCommand } from '@/features/support/faqs-tags/admin/command/create-faqs-tag/create-faqs-tag.command';
import { CreateFaqsTagResponse } from '@/features/support/faqs-tags/admin/command/create-faqs-tag/create-faqs-tag.response';
import { Faqs } from '@/features/support/faqs/faqs.entity';

@CommandHandler(CreateFaqsTagCommand)
export class CreateFaqsTagHandler implements ICommandHandler<CreateFaqsTagCommand> {
  async execute(cmd: CreateFaqsTagCommand): Promise<CreateFaqsTagResponse> {
    const faqs = await Faqs.findOne({ where: { id: cmd.faqsId }, relations: ['tags'] });
    if (!faqs) throw new NotFoundException('Faqs with given id not found');

    const tag = await Tags.findOneBy({ id: cmd.tagId });
    if (!tag) throw new NotFoundException('Tag with given id not found');
    faqs.tags.push(tag);
    await Faqs.save(faqs);
    return { faqsId: faqs.id, tagId: tag.id };
  }
}
