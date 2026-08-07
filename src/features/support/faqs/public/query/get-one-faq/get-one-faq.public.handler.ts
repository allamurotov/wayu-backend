import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Faqs } from '@/features/support/faqs/faqs.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneFaqPublicQuery } from '@/features/support/faqs/public/query/get-one-faq/get-one-faq.public.request';
import { GetOneFaqPublicResponse } from '@/features/support/faqs/public/query/get-one-faq/get-one-faq.public.response';

@QueryHandler(GetOneFaqPublicQuery)
export class GetOneFaqPublicHandler implements IQueryHandler<GetOneFaqPublicQuery> {
  async execute(query: GetOneFaqPublicQuery): Promise<GetOneFaqPublicResponse> {
    const faq = await Faqs.findOneBy({ id: query.id });

    if (!faq) throw new NotFoundException('FAQ with given id not found');

    return plainToInstance(GetOneFaqPublicResponse, faq, { excludeExtraneousValues: true });
  }
}
