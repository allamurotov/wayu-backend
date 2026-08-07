import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCountryCommand } from '@/features/common/countries/admin/command/create-country/create-country.command';
import { CreateCountryResponse } from '@/features/common/countries/admin/command/create-country/create-country.response';
import { ILike } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Countries } from '@/features/common/countries/countries.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateCountryCommand)
export class CreateCountryHandler implements ICommandHandler<CreateCountryCommand> {
  async execute(command: CreateCountryCommand): Promise<CreateCountryResponse> {
    const alreadyExists = await Countries.existsBy({ title: ILike(command.title) });

    if (alreadyExists) throw new BadRequestException('Country already exists');

    const country = Countries.create({
      title: command.title,
      flag: command.flag.filename,
    });

    await Countries.save(country);
    return plainToInstance(CreateCountryResponse, country, { excludeExtraneousValues: true });
  }
}
