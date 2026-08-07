import { Command } from '@nestjs/cqrs';
import { VacancyType } from '@/core/enum/enum';
import { UpdateVacancyResponse } from '@/features/careers/vacancy/admin/command/update-vacancy/update-vacancy.response';

export class UpdateVacancyCommand extends Command<UpdateVacancyResponse> {
  constructor(
    public id: number,
    public title?: string,
    public address?: string,
    public description?: string,
    public phoneNumber?: string,
    public type?: VacancyType,
    public salary?: string,
    public isActive?: boolean,
  ) {
    super();
  }
}
