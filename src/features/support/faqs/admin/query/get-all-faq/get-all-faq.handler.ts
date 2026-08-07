import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllFaqQuery } from '@/features/support/faqs/admin/query/get-all-faq/get-all-faq.query';
import { GetAllFaqResponse } from '@/features/support/faqs/admin/query/get-all-faq/get-all-faq.response';
import { Faqs } from '@/features/support/faqs/faqs.entity';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllFaqQuery)
export class GetAllFaqHandler implements IQueryHandler<GetAllFaqQuery> {
  async execute(query: GetAllFaqQuery): Promise<GetAllFaqResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const faqs = await Faqs.find({ skip, take });
    return plainToInstance(GetAllFaqResponse, faqs, { excludeExtraneousValues: true });
  }
}
