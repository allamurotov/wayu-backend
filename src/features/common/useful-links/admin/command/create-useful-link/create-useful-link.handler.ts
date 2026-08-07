import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { CreateUsefulLinkCommand } from '@/features/common/useful-links/admin/command/create-useful-link/create-useful-link.command';
import { CreateUsefulLinkResponse } from '@/features/common/useful-links/admin/command/create-useful-link/create-useful-link.response';
import { UsefulLinks } from '@/features/common/useful-links/usefulLinks.entity';

@CommandHandler(CreateUsefulLinkCommand)
export class CreateUsefulLinkHandler implements ICommandHandler<CreateUsefulLinkCommand> {
  async execute(command: CreateUsefulLinkCommand): Promise<CreateUsefulLinkResponse> {
    const usefulLink = UsefulLinks.create({
      title: command.title,
      icon: command.icon.path,
      link: command.link,
    });
    await UsefulLinks.save(usefulLink);
    return plainToInstance(CreateUsefulLinkResponse, usefulLink, { excludeExtraneousValues: true });
  }
}
