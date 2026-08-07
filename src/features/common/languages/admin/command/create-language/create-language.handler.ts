import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { CreateLanguageCommand } from '@/features/common/languages/admin/command/create-language/create-language.command';
import { CreateLanguageResponse } from '@/features/common/languages/admin/command/create-language/create-language.response';
import { Languages } from '@/features/common/languages/languages.entity';

@CommandHandler(CreateLanguageCommand)
export class CreateLanguageHandler implements ICommandHandler<CreateLanguageCommand> {
  async execute(command: CreateLanguageCommand): Promise<CreateLanguageResponse> {
    const language = Languages.create({ title: command.title });
    await Languages.save(language);
    return plainToInstance(CreateLanguageResponse, language, { excludeExtraneousValues: true });
  }
}
