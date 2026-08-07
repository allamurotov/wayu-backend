import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRepresentativeCommand } from './update-representative.command';
import { UpdateRepresentativeResponse } from './update-representative.response';
import { Representatives } from '@/features/network/representative/representatives.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@CommandHandler(UpdateRepresentativeCommand)
export class UpdateRepresentativeHandler implements ICommandHandler<UpdateRepresentativeCommand> {
  async execute(command: UpdateRepresentativeCommand): Promise<UpdateRepresentativeResponse> {
    const representative = await Representatives.findOneBy({ id: command.id });
    if (!representative) {
      throw new NotFoundException('Representative with given id not found');
    }

    if (command.fullName !== undefined) representative.fullName = command.fullName;

    if (command.image !== undefined) representative.image = command.image.path;

    if (command.email !== undefined) representative.email = command.email;

    if (command.phoneNumber !== undefined) representative.phoneNumber = command.phoneNumber;

    if (command.resume !== undefined) representative.resume = command.resume;

    await Representatives.save(representative);
    return plainToInstance(UpdateRepresentativeResponse, representative, { excludeExtraneousValues: true });
  }
}
