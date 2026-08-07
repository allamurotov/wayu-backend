import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAuthorCommand } from '@/features/library/author/admin/command/update-author/update-author.command';
import { UpdateAuthorResponse } from '@/features/library/author/admin/command/update-author/update-author.response';
import { Authors } from '@/features/library/author/authors.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@CommandHandler(UpdateAuthorCommand)
export class UpdateAuthorHandler implements ICommandHandler<UpdateAuthorCommand> {
  async execute(command: UpdateAuthorCommand): Promise<UpdateAuthorResponse> {
    const author = await Authors.findOneBy({ id: command.id });

    if (!author) throw new NotFoundException('Author with given id not found');

    if (command.fullName !== undefined) author.fullName = command.fullName;

    await Authors.save(author);
    return plainToInstance(UpdateAuthorResponse, author, { excludeExtraneousValues: true });
  }
}
