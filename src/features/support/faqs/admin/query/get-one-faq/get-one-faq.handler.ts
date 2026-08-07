import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneFaqQuery } from '@/features/support/faqs/admin/query/get-one-faq/get-one-faq.request';
import { GetOneFaqResponse } from '@/features/support/faqs/admin/query/get-one-faq/get-one-faq.response';
import { Faqs } from '@/features/support/faqs/faqs.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneFaqQuery)
export class GetOneFaqHandler implements IQueryHandler<GetOneFaqQuery> {
  async execute(query: GetOneFaqQuery): Promise<GetOneFaqResponse> {
    const faq = await Faqs.findOneBy({ id: query.id });

    if (!faq) throw new NotFoundException('FAQ with given id not found');

    return plainToInstance(GetOneFaqResponse, faq, { excludeExtraneousValues: true });
  }
}
