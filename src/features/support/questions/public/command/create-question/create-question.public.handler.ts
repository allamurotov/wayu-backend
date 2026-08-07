import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateQuestionPublicCommand } from '@/features/support/questions/public/command/create-question/create-question.public.command';
import { CreateQuestionPublicResponse } from '@/features/support/questions/public/command/create-question/create-question.public.response';
import { Questions } from '@/features/support/questions/questions.entity';
import { QuestionStatus } from '@/core/enum/enum';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateQuestionPublicCommand)
export class CreateQuestionPublicHandler implements ICommandHandler<CreateQuestionPublicCommand> {
  async execute(command: CreateQuestionPublicCommand): Promise<CreateQuestionPublicResponse> {
    const question = Questions.create({
      fullName: command.fullName,
      phoneNumber: command.phoneNumber,
      email: command.email,
      questions: command.questions,
      status: QuestionStatus.PENDING,
    });

    await Questions.save(question);
    return plainToInstance(CreateQuestionPublicResponse, question, { excludeExtraneousValues: true });
  }
}
