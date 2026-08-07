import { Query } from '@nestjs/cqrs';
import { GetAllVacancyPublicResponse } from '@/features/careers/vacancy/public/query/get-all-vacancy/get-all-vacancy.public.response';
import { GetAllVacancyFilters } from '@/features/careers/vacancy/admin/query/get-all-vacancy/get-all-vacancy.filters';

export class GetAllVacancyPublicQuery extends Query<GetAllVacancyPublicResponse[]> {
  constructor(public readonly filters: GetAllVacancyFilters) {
    super();
  }
}
