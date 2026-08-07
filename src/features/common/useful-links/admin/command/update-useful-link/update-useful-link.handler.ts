import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UpdateSocialLinkCommand } from '@/features/common/social-links/admin/command/update-social-link/update-social-link.command';
import { UpdateSocialLinkResponse } from '@/features/common/social-links/admin/command/update-social-link/update-social-link.response';
import { SocialLinks } from '@/features/common/social-links/socialLinks.entity';
import { UpdateUsefulLinkCommand } from '@/features/common/useful-links/admin/command/update-useful-link/update-useful-link.command';
import { UpdateUsefulLinkResponse } from '@/features/common/useful-links/admin/command/update-useful-link/update-useful-link.response';
import { UsefulLinks } from '@/features/common/useful-links/usefulLinks.entity';

@CommandHandler(UpdateUsefulLinkCommand)
export class UpdateUsefulLinkHandler implements ICommandHandler<UpdateUsefulLinkCommand> {
  async execute(command: UpdateUsefulLinkCommand): Promise<UpdateUsefulLinkResponse> {
    const usefulLink = await UsefulLinks.findOneBy({ id: command.id });
    if (!usefulLink) {
      throw new NotFoundException('link with given id not found');
    }

    Object.assign(usefulLink, Object.fromEntries(Object.entries(command).filter(([key, value]) => value)));

    await UsefulLinks.save(usefulLink);
    return plainToInstance(UpdateUsefulLinkResponse, usefulLink, { excludeExtraneousValues: true });
  }
}
