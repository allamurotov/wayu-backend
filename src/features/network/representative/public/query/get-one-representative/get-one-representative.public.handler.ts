import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneRepresentativePublicQuery } from './get-one-representative.public.query';
import { GetOneRepresentativePublicResponse } from './get-one-representative.public.response';
import { Representatives } from '@/features/network/representative/representatives.entity';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOneRepresentativePublicQuery)
export class GetOneRepresentativePublicHandler implements IQueryHandler<GetOneRepresentativePublicQuery> {
  async execute(query: GetOneRepresentativePublicQuery): Promise<GetOneRepresentativePublicResponse> {
    const representative = await Representatives.findOneBy({ id: query.id });

    if (!representative) {
      throw new NotFoundException('Representative not found');
    }

    return plainToInstance(GetOneRepresentativePublicResponse, representative, { excludeExtraneousValues: true });
  }
}
