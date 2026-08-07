import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Countries } from '@/features/common/countries/countries.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllCountryPublicQuery } from '@/features/common/countries/public/query/get-all-country/get-all-country.public.query';
import { GetAllCountryPublicResponse } from '@/features/common/countries/public/query/get-all-country/get-all-country.public.response';

@QueryHandler(GetAllCountryPublicQuery)
export class GetAllCountryPublicHandler implements IQueryHandler<GetAllCountryPublicQuery> {
  async execute(query: GetAllCountryPublicQuery): Promise<GetAllCountryPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const countries = await Countries.find({ skip: skip, take: take });
    return plainToInstance(GetAllCountryPublicResponse, countries, { excludeExtraneousValues: true });
  }
}
