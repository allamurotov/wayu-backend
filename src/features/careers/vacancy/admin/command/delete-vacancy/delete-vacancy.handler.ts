import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Vacancies } from '@/features/careers/vacancy/vacancies.entity';
import { NotFoundException } from '@nestjs/common';
import { DeleteVacancyCommand } from '@/features/careers/vacancy/admin/command/delete-vacancy/delete-vacancy.command';

@CommandHandler(DeleteVacancyCommand)
export class DeleteVacancyHandler implements ICommandHandler<DeleteVacancyCommand> {
  async execute(cmd: DeleteVacancyCommand): Promise<void> {
    const vacancy = await Vacancies.findOneBy({ id: cmd.id });
    if (!vacancy) throw new NotFoundException('Vacancy with given id not found');
    await Vacancies.delete(cmd.id);
  }
}
