import { Query } from '@nestjs/cqrs';
import { GetAllVacancyResponse } from '@/features/careers/vacancy/admin/query/get-all-vacancy/get-all-vacancy.response';
import { GetAllVacancyFilters } from '@/features/careers/vacancy/admin/query/get-all-vacancy/get-all-vacancy.filters';

export class GetAllVacancyQuery extends Query<GetAllVacancyResponse[]> {
  constructor(public readonly filters: GetAllVacancyFilters) {
    super();
  }
}
