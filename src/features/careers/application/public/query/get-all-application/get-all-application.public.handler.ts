import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Applications } from '@/features/careers/application/applications.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllApplicationPublicQuery } from '@/features/careers/application/public/query/get-all-application/get-all-application.public.query';
import { GetAllApplicationPublicResponse } from '@/features/careers/application/public/query/get-all-application/get-all-application.public.response';

@QueryHandler(GetAllApplicationPublicQuery)
export class GetAllApplicationPublicHandler implements IQueryHandler<GetAllApplicationPublicQuery> {
  async execute(query: GetAllApplicationPublicQuery): Promise<GetAllApplicationPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const applications = await Applications.find({ skip: skip, take: take });
    return plainToInstance(GetAllApplicationPublicResponse, applications, { excludeExtraneousValues: true });
  }
}
