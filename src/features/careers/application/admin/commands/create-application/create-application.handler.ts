import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Applications } from '@/features/careers/application/applications.entity';
import { Vacancies } from '@/features/careers/vacancy/vacancies.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateApplicationCommand } from '@/features/careers/application/admin/commands/create-application/create-application.command';
import { CreateApplicationResponse } from '@/features/careers/application/admin/commands/create-application/create-application.response';

@CommandHandler(CreateApplicationCommand)
export class CreateApplicationHandler implements ICommandHandler<CreateApplicationCommand> {
  async execute(command: CreateApplicationCommand): Promise<CreateApplicationResponse> {
    const vacancyExists = await Vacancies.existsBy({ id: command.vacancyId });
    if (!vacancyExists) throw new NotFoundException('Vacancy with given id not found');

    const application = {
      fullName: command.fullName,
      phoneNumber: command.phoneNumber,
      email: command.email,
      vacancyId: command.vacancyId,
      resume: command.resume.path,
    } as Applications;
    await Applications.save(application);
    return plainToInstance(CreateApplicationResponse, application, { excludeExtraneousValues: true });
  }
}
