import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateFaqCommand } from '@/features/support/faqs/admin/command/update-faq/update-faq.command';
import { UpdateFaqResponse } from '@/features/support/faqs/admin/command/update-faq/update-faq.response';
import { Faqs } from '@/features/support/faqs/faqs.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@CommandHandler(UpdateFaqCommand)
export class UpdateFaqHandler implements ICommandHandler<UpdateFaqCommand> {
  async execute(command: UpdateFaqCommand): Promise<UpdateFaqResponse> {
    const faq = await Faqs.findOneBy({ id: command.id });

    if (!faq) throw new NotFoundException('FAQ with given id not found');

    if (command.question !== undefined) faq.question = command.question;

    if (command.answer !== undefined) faq.answer = command.answer;

    await Faqs.save(faq);
    return plainToInstance(UpdateFaqResponse, faq, { excludeExtraneousValues: true });
  }
}
