import { Query } from '@nestjs/cqrs';
import { GetAllFaqResponse } from '@/features/support/faqs/admin/query/get-all-faq/get-all-faq.response';
import { GetAllFaqFilters } from '@/features/support/faqs/admin/query/get-all-faq/get-all-faq.filters';
import { GetAllFaqPublicResponse } from '@/features/support/faqs/public/query/get-all-faq/get-all-faq.public.response';
import { GetAllFaqPublicFilters } from '@/features/support/faqs/public/query/get-all-faq/get-all-faq.public.filters';

export class GetAllFaqPublicQuery extends Query<GetAllFaqPublicResponse[]> {
  constructor(public filters: GetAllFaqPublicFilters) {
    super();
  }
}
