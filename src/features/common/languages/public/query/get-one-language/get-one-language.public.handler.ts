import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Languages } from '@/features/common/languages/languages.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneLanguagePublicQuery } from '@/features/common/languages/public/query/get-one-language/get-one-language.public.query';
import { GetOneLanguagePublicResponse } from '@/features/common/languages/public/query/get-one-language/get-one-language.public.response';

@QueryHandler(GetOneLanguagePublicQuery)
export class GetOneLanguagePublicHandler implements IQueryHandler<GetOneLanguagePublicQuery> {
  async execute(query: GetOneLanguagePublicQuery): Promise<GetOneLanguagePublicResponse> {
    const language = await Languages.findOneBy({ id: query.id });
    if (!language) throw new NotFoundException('Language with given id not found');
    return plainToInstance(GetOneLanguagePublicResponse, language, { excludeExtraneousValues: true });
  }
}
