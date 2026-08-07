import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Countries } from '@/features/common/countries/countries.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneCountryPublicQuery } from '@/features/common/countries/public/query/get-one-country/get-one-country.public.query';
import { GetOneCountryPublicResponse } from '@/features/common/countries/public/query/get-one-country/get-one-country.public.response';

@QueryHandler(GetOneCountryPublicQuery)
export class GetOneCountryPublicHandler implements IQueryHandler<GetOneCountryPublicQuery> {
  async execute(query: GetOneCountryPublicQuery): Promise<GetOneCountryPublicResponse> {
    const country = await Countries.findOneBy({ id: query.id });
    if (!country) throw new NotFoundException('Country with given id not found');
    return plainToInstance(GetOneCountryPublicResponse, country, { excludeExtraneousValues: true });
  }
}
