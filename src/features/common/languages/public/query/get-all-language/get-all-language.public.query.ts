import { Query } from '@nestjs/cqrs';
import { GetAllLanguagePublicFilters } from '@/features/common/languages/public/query/get-all-language/get-all-language.public.filters';
import { GetAllLanguagePublicResponse } from '@/features/common/languages/public/query/get-all-language/get-all-language.public.response';

export class GetAllLanguagePublicQuery extends Query<GetAllLanguagePublicResponse[]> {
  constructor(public readonly filters: GetAllLanguagePublicFilters) {
    super();
  }
}
