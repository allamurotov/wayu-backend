import { Command } from '@nestjs/cqrs';
import { UpdateQuestionResponse } from '@/features/support/questions/admin/command/update-question/update-question.response';
import { QuestionStatus } from '@/core/enum/enum';

export class UpdateQuestionCommand extends Command<UpdateQuestionResponse> {
  constructor(
    public id: number,
    public fullName?: string,
    public phoneNumber?: string,
    public questions?: string,
    public status?: QuestionStatus,
  ) {
    super();
  }
}
