import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Languages } from '@/features/common/languages/languages.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllLanguagePublicQuery } from '@/features/common/languages/public/query/get-all-language/get-all-language.public.query';
import { GetAllLanguagePublicResponse } from '@/features/common/languages/public/query/get-all-language/get-all-language.public.response';

@QueryHandler(GetAllLanguagePublicQuery)
export class GetAllLanguagePublicHandler implements IQueryHandler<GetAllLanguagePublicQuery> {
  async execute(query: GetAllLanguagePublicQuery): Promise<GetAllLanguagePublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const languages = await Languages.find({ skip: skip, take: take });
    return plainToInstance(GetAllLanguagePublicResponse, languages, { excludeExtraneousValues: true });
  }
}
