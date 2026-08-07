import { plainToInstance } from 'class-transformer';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Languages } from '@/features/common/languages/languages.entity';
import { GetAllLanguageResponse } from '@/features/common/languages/admin/query/get-all-language/get-all-language.response';
import { GetAllLanguageQuery } from '@/features/common/languages/admin/query/get-all-language/get-all-language.query';

@QueryHandler(GetAllLanguageQuery)
export class GetAllLanguageHandler implements IQueryHandler<GetAllLanguageQuery> {
  async execute(query: GetAllLanguageQuery): Promise<GetAllLanguageResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const language = await Languages.find({ skip: skip, take: take });
    return plainToInstance(GetAllLanguageResponse, language, { excludeExtraneousValues: true });
  }
}
