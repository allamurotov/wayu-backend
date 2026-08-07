import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllRepresentativePublicQuery } from './get-all-representative.public.query';
import { GetAllRepresentativePublicResponse } from './get-all-representative.public.response';
import { Representatives } from '@/features/network/representative/representatives.entity';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllRepresentativePublicQuery)
export class GetAllRepresentativePublicHandler implements IQueryHandler<GetAllRepresentativePublicQuery> {
  async execute(query: GetAllRepresentativePublicQuery): Promise<GetAllRepresentativePublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = query.filters?.page ? (currentPage - 1) * take : 0;

    const representatives = await Representatives.find({
      take,
      skip,
      order: { createdAt: 'DESC' },
    });

    return plainToInstance(GetAllRepresentativePublicResponse, representatives, { excludeExtraneousValues: true });
  }
}
