import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneCountryQuery } from '@/features/common/countries/admin/query/get-one-country/get-one-country.query';
import { GetOneCountryResponse } from '@/features/common/countries/admin/query/get-one-country/get-one-country.response';
import { Countries } from '@/features/common/countries/countries.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneCountryQuery)
export class GetOneCountryHandler implements IQueryHandler<GetOneCountryQuery> {
  async execute(query: GetOneCountryQuery): Promise<GetOneCountryResponse> {
    const country = await Countries.findOneBy({ id: query.id });
    if (!country) {
      throw new NotFoundException('country with given id not found');
    }
    return plainToInstance(GetOneCountryResponse, country, { excludeExtraneousValues: true });
  }
}
