import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCountryCommand } from '@/features/common/countries/admin/command/delete-country/delete-country.command';
import { Countries } from '@/features/common/countries/countries.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { News } from '@/features/news/news/news.entity';

@CommandHandler(DeleteCountryCommand)
export class DeleteCountryHandler implements ICommandHandler<DeleteCountryCommand> {
  async execute(cmd: DeleteCountryCommand): Promise<void> {
    const country = await Countries.findOneBy({ id: cmd.id });
    if (!country) {
      throw new NotFoundException('country with given if not found');
    }

    const hasAnyAttachedNews = await News.existsBy({ countryId: cmd.id });
    if (hasAnyAttachedNews) {
      throw new BadRequestException('Category has attached News,move or delete them first');
    }

    await Countries.remove(country);
  }
}
