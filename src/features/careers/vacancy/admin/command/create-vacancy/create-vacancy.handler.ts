import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Vacancies } from '@/features/careers/vacancy/vacancies.entity';
import { plainToInstance } from 'class-transformer';
import { CreateVacancyCommand } from '@/features/careers/vacancy/admin/command/create-vacancy/create-vacancy.command';
import { CreateVacancyResponse } from '@/features/careers/vacancy/admin/command/create-vacancy/create-vacancy.response';
@CommandHandler(CreateVacancyCommand)
export class CreateVacancyHandler implements ICommandHandler<CreateVacancyCommand> {
  async execute(command: CreateVacancyCommand): Promise<CreateVacancyResponse> {
    const vacancy = {
      title: command.title,
      address: command.address,
      description: command.description,
      phoneNumber: command.phoneNumber,
      type: command.type,
      salary: command.salary,
      isActive: command.isActive,
    } as Vacancies;
    await Vacancies.save(vacancy);
    return plainToInstance(CreateVacancyResponse, vacancy, { excludeExtraneousValues: true });
  }
}
