import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Languages } from '@/features/common/languages/languages.entity';
import { GetOneLanguageQuery } from '@/features/common/languages/admin/query/get-one-language/get-one-language.query';
import { GetOneLanguageResponse } from '@/features/common/languages/admin/query/get-one-language/get-one-language.response';

@QueryHandler(GetOneLanguageQuery)
export class GetOneLanguageHandler implements IQueryHandler<GetOneLanguageQuery> {
  async execute(query: GetOneLanguageQuery): Promise<GetOneLanguageResponse> {
    const language = await Languages.findOneBy({ id: query.id });
    if (!language) {
      throw new NotFoundException('language with given id not found');
    }
    return plainToInstance(GetOneLanguageResponse, language, { excludeExtraneousValues: true });
  }
}
