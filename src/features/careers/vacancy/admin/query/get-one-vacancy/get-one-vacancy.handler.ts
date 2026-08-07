import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Vacancies } from '@/features/careers/vacancy/vacancies.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneVacancyQuery } from '@/features/careers/vacancy/admin/query/get-one-vacancy/get-one-vacancy.query';
import { GetOneVacancyResponse } from '@/features/careers/vacancy/admin/query/get-one-vacancy/get-one-vacancy.response';

@QueryHandler(GetOneVacancyQuery)
export class GetOneVacancyHandler implements IQueryHandler<GetOneVacancyQuery> {
  async execute(query: GetOneVacancyQuery): Promise<GetOneVacancyResponse> {
    const vacancy = await Vacancies.findOneBy({ id: query.id });

    if (!vacancy) throw new NotFoundException('Vacancy with given id not found');

    return plainToInstance(GetOneVacancyResponse, vacancy, { excludeExtraneousValues: true });
  }
}
