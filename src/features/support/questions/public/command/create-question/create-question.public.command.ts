import { Command } from '@nestjs/cqrs';
import { CreateQuestionPublicResponse } from '@/features/support/questions/public/command/create-question/create-question.public.response';

export class CreateQuestionPublicCommand extends Command<CreateQuestionPublicResponse> {
  constructor(
    public fullName: string,
    public phoneNumber: string,
    public questions: string,
    public email?: string,
  ) {
    super();
  }
}
