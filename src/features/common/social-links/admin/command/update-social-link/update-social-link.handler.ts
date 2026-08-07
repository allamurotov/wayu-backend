import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UpdateSocialLinkCommand } from '@/features/common/social-links/admin/command/update-social-link/update-social-link.command';
import { UpdateSocialLinkResponse } from '@/features/common/social-links/admin/command/update-social-link/update-social-link.response';
import { SocialLinks } from '@/features/common/social-links/socialLinks.entity';

@CommandHandler(UpdateSocialLinkCommand)
export class UpdateSocialLinkHandler implements ICommandHandler<UpdateSocialLinkCommand> {
  async execute(command: UpdateSocialLinkCommand): Promise<UpdateSocialLinkResponse> {
    const socialLink = await SocialLinks.findOneBy({ id: command.id });
    if (!socialLink) {
      throw new NotFoundException('link with given id not found');
    }

    Object.assign(socialLink, Object.fromEntries(Object.entries(command).filter(([key, value]) => value)));

    await SocialLinks.save(socialLink);
    return plainToInstance(UpdateSocialLinkResponse, socialLink, { excludeExtraneousValues: true });
  }
}
