import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateQuestionCommand } from '@/features/support/questions/admin/command/create-question/create-question.command';
import { CreateQuestionResponse } from '@/features/support/questions/admin/command/create-question/create-question.response';
import { Questions } from '@/features/support/questions/questions.entity';
import { QuestionStatus } from '@/core/enum/enum';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionHandler implements ICommandHandler<CreateQuestionCommand> {
  async execute(command: CreateQuestionCommand): Promise<CreateQuestionResponse> {
    const question = {
      fullName: command.fullName,
      phoneNumber: command.phoneNumber,
      questions: command.questions,
      status: QuestionStatus.PENDING,
    } as Questions;
    await Questions.save(question);
    return plainToInstance(CreateQuestionResponse, question, { excludeExtraneousValues: true });
  }
}
