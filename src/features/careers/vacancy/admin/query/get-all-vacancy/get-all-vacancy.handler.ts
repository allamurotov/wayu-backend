import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Vacancies } from '@/features/careers/vacancy/vacancies.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllVacancyQuery } from '@/features/careers/vacancy/admin/query/get-all-vacancy/get-all-vacancy.query';
import { GetAllVacancyResponse } from '@/features/careers/vacancy/admin/query/get-all-vacancy/get-all-vacancy.response';

@QueryHandler(GetAllVacancyQuery)
export class GetAllVacancyHandler implements IQueryHandler<GetAllVacancyQuery> {
  async execute(query: GetAllVacancyQuery): Promise<GetAllVacancyResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const vacancies = await Vacancies.find({ skip: skip, take: take });
    return plainToInstance(GetAllVacancyResponse, vacancies, { excludeExtraneousValues: true });
  }
}
