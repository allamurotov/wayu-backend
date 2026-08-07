import { Command } from '@nestjs/cqrs';
import { CreateQuestionResponse } from '@/features/support/questions/admin/command/create-question/create-question.response';

export class CreateQuestionCommand extends Command<CreateQuestionResponse> {
  constructor(
    public fullName: string,
    public phoneNumber: string,
    public questions: string,
  ) {
    super();
  }
}
