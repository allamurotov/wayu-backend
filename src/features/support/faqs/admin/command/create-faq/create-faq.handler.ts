import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFaqCommand } from '@/features/support/faqs/admin/command/create-faq/create-faq.command';
import { CreateFaqResponse } from '@/features/support/faqs/admin/command/create-faq/create-faq.response';
import { Faqs } from '@/features/support/faqs/faqs.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateFaqCommand)
export class CreateFaqHandler implements ICommandHandler<CreateFaqCommand> {
  async execute(command: CreateFaqCommand): Promise<CreateFaqResponse> {
    const faq = { question: command.question, answer: command.answer } as Faqs;
    await Faqs.save(faq);
    return plainToInstance(CreateFaqResponse, faq, { excludeExtraneousValues: true });
  }
}
