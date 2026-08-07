import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateQuestionCommand } from '@/features/support/questions/admin/command/update-question/update-question.command';
import { UpdateQuestionResponse } from '@/features/support/questions/admin/command/update-question/update-question.response';
import { Questions } from '@/features/support/questions/questions.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@CommandHandler(UpdateQuestionCommand)
export class UpdateQuestionHandler implements ICommandHandler<UpdateQuestionCommand> {
  async execute(command: UpdateQuestionCommand): Promise<UpdateQuestionResponse> {
    const question = await Questions.findOneBy({ id: command.id });

    if (!question) throw new NotFoundException('Question with given id not found');

    if (command.fullName !== undefined) question.fullName = command.fullName;

    if (command.phoneNumber !== undefined) question.phoneNumber = command.phoneNumber;

    if (command.questions !== undefined) question.questions = command.questions;

    if (command.status !== undefined) question.status = command.status;

    await Questions.save(question);
    return plainToInstance(UpdateQuestionResponse, question, { excludeExtraneousValues: true });
  }
}
