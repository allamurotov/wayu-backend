import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { CreateSocialLinkCommand } from '@/features/common/social-links/admin/command/create-social-link/create-social-link.command';
import { CreateSocialLinkResponse } from '@/features/common/social-links/admin/command/create-social-link/create-social-link.response';
import { SocialLinks } from '@/features/common/social-links/socialLinks.entity';

@CommandHandler(CreateSocialLinkCommand)
export class CreateSocialLinkHandler implements ICommandHandler<CreateSocialLinkCommand> {
  async execute(command: CreateSocialLinkCommand): Promise<CreateSocialLinkResponse> {
    const socialLink = SocialLinks.create({
      title: command.title,
      icon: command.icon.path,
      link: command.link,
    });
    await SocialLinks.save(socialLink);
    return plainToInstance(CreateSocialLinkResponse, socialLink, { excludeExtraneousValues: true });
  }
}
