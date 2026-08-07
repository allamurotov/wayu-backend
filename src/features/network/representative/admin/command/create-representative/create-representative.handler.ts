import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRepresentativeCommand } from './create-representative.command';
import { CreateRepresentativeResponse } from './create-representative.response';
import { Representatives } from '@/features/network/representative/representatives.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateRepresentativeCommand)
export class CreateRepresentativeHandler implements ICommandHandler<CreateRepresentativeCommand> {
  async execute(command: CreateRepresentativeCommand): Promise<CreateRepresentativeResponse> {
    const representative = {
      fullName: command.fullName,
      image: command.image.path,
      email: command.email,
      phoneNumber: command.phoneNumber,
      resume: command.resume,
    } as Representatives;

    await Representatives.save(representative);
    return plainToInstance(CreateRepresentativeResponse, representative, { excludeExtraneousValues: true });
  }
}
