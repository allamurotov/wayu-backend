import { Command } from '@nestjs/cqrs';
import { VacancyType } from '@/core/enum/enum';
import { CreateVacancyResponse } from '@/features/careers/vacancy/admin/command/create-vacancy/create-vacancy.response';

export class CreateVacancyCommand extends Command<CreateVacancyResponse> {
  constructor(
    public title: string,
    public address: string,
    public description: string,
    public phoneNumber: string,
    public type: VacancyType,
    public salary: string,
    public isActive: boolean,
  ) {
    super();
  }
}
