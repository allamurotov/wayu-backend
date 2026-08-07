import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Applications } from '@/features/careers/application/applications.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllApplicationQuery } from '@/features/careers/application/admin/query/get-all-application/get-all-application.query';
import { GetAllApplicationResponse } from '@/features/careers/application/admin/query/get-all-application/get-all-application.response';

@QueryHandler(GetAllApplicationQuery)
export class GetAllApplicationHandler implements IQueryHandler<GetAllApplicationQuery> {
  async execute(query: GetAllApplicationQuery): Promise<GetAllApplicationResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const applications = await Applications.find({ skip: skip, take: take });
    return plainToInstance(GetAllApplicationResponse, applications, { excludeExtraneousValues: true });
  }
}
