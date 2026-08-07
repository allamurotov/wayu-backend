import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllCountryQuery } from '@/features/common/countries/admin/query/get-all-country/get-all-country.query';
import { Countries } from '@/features/common/countries/countries.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllCountryResponse } from '@/features/common/countries/admin/query/get-all-country/get-all-country.response';

@QueryHandler(GetAllCountryQuery)
export class GetAllCountryHandler implements IQueryHandler<GetAllCountryQuery> {
  async execute(query: GetAllCountryQuery): Promise<GetAllCountryResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const country = await Countries.find({ skip: skip, take: take });
    return plainToInstance(GetAllCountryResponse, country, { excludeExtraneousValues: true });
  }
}
