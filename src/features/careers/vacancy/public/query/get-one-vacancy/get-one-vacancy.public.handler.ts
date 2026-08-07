import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Vacancies } from '@/features/careers/vacancy/vacancies.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneVacancyPublicQuery } from '@/features/careers/vacancy/public/query/get-one-vacancy/get-one-vacancy.public.query';
import { GetOneVacancyPublicResponse } from '@/features/careers/vacancy/public/query/get-one-vacancy/get-one-vacancy.public.response';

@QueryHandler(GetOneVacancyPublicQuery)
export class GetOneVacancyPublicHandler implements IQueryHandler<GetOneVacancyPublicQuery> {
  async execute(query: GetOneVacancyPublicQuery): Promise<GetOneVacancyPublicResponse> {
    const vacancy = await Vacancies.findOneBy({ id: query.id });

    if (!vacancy) throw new NotFoundException('Vacancy with given id not found');

    return plainToInstance(GetOneVacancyPublicResponse, vacancy, { excludeExtraneousValues: true });
  }
}
