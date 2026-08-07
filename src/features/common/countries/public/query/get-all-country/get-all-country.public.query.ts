import { Query } from '@nestjs/cqrs';
import { GetAllCountryPublicFilters } from '@/features/common/countries/public/query/get-all-country/get-all-country.public.filters';
import { GetAllCountryPublicResponse } from '@/features/common/countries/public/query/get-all-country/get-all-country.public.response';

export class GetAllCountryPublicQuery extends Query<GetAllCountryPublicResponse[]> {
  constructor(public readonly filters: GetAllCountryPublicFilters) {
    super();
  }
}
