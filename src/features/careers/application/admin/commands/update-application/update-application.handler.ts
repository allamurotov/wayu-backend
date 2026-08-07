import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Applications } from '@/features/careers/application/applications.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UpdateApplicationCommand } from '@/features/careers/application/admin/commands/update-application/update-application.command';
import { UpdateApplicationResponse } from '@/features/careers/application/admin/commands/update-application/update-application.response';

@CommandHandler(UpdateApplicationCommand)
export class UpdateApplicationHandler implements ICommandHandler<UpdateApplicationCommand> {
  async execute(command: UpdateApplicationCommand): Promise<UpdateApplicationResponse> {
    const application = await Applications.findOneBy({ id: command.id });
    if (!application) throw new NotFoundException('Application with given id not found');

    if (command.fullName !== undefined) application.fullName = command.fullName;
    if (command.phoneNumber !== undefined) application.phoneNumber = command.phoneNumber;
    if (command.email !== undefined) application.email = command.email;
    if (command.vacancyId !== undefined) application.vacancyId = command.vacancyId;
    if (command.resume !== undefined) application.resume = command.resume.path;
    if (command.status !== undefined) application.status = command.status;

    await Applications.save(application);
    return plainToInstance(UpdateApplicationResponse, application, { excludeExtraneousValues: true });
  }
}
