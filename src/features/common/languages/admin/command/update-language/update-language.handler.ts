import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UpdateLanguageCommand } from '@/features/common/languages/admin/command/update-language/update-language.command';
import { UpdateLanguageResponse } from '@/features/common/languages/admin/command/update-language/update-language.response';
import { Languages } from '@/features/common/languages/languages.entity';

@CommandHandler(UpdateLanguageCommand)
export class UpdateLanguageHandler implements ICommandHandler<UpdateLanguageCommand> {
  async execute(command: UpdateLanguageCommand): Promise<UpdateLanguageResponse> {
    const language = await Languages.findOneBy({ id: command.id });
    if (!language) {
      throw new NotFoundException('language with given id not found');
    }

    Object.assign(language, Object.fromEntries(Object.entries(command).filter(([key, value]) => value)));

    await Languages.save(language);
    return plainToInstance(UpdateLanguageResponse, language, { excludeExtraneousValues: true });
  }
}
