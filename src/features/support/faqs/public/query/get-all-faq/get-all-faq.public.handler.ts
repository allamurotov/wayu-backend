import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Faqs } from '@/features/support/faqs/faqs.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllFaqPublicQuery } from '@/features/support/faqs/public/query/get-all-faq/get-all-faq.public.query';
import { GetAllFaqPublicResponse } from '@/features/support/faqs/public/query/get-all-faq/get-all-faq.public.response';

@QueryHandler(GetAllFaqPublicQuery)
export class GetAllFaqPublicHandler implements IQueryHandler<GetAllFaqPublicQuery> {
  async execute(query: GetAllFaqPublicQuery): Promise<GetAllFaqPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const faqs = await Faqs.find({ skip, take });
    return plainToInstance(GetAllFaqPublicResponse, faqs, { excludeExtraneousValues: true });
  }
}
