import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAuthorCommand } from '@/features/library/author/admin/command/create-author/create-author.command';
import { CreateAuthorResponse } from '@/features/library/author/admin/command/create-author/create-author.response';
import { Authors } from '@/features/library/author/authors.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateAuthorCommand)
export class CreateAuthorHandler implements ICommandHandler<CreateAuthorCommand> {
  async execute(command: CreateAuthorCommand): Promise<CreateAuthorResponse> {
    const author = { fullName: command.fullName } as Authors;
    await Authors.save(author);
    return plainToInstance(CreateAuthorResponse, author, { excludeExtraneousValues: true });
  }
}
