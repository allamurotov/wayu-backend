import { Query } from '@nestjs/cqrs';
import { GetAllLanguageFilters } from '@/features/common/languages/admin/query/get-all-language/get-all-language.filters';
import { GetAllLanguageResponse } from '@/features/common/languages/admin/query/get-all-language/get-all-language.response';

export class GetAllLanguageQuery extends Query<GetAllLanguageResponse[]> {
  constructor(public readonly filters: GetAllLanguageFilters) {
    super();
  }
}
