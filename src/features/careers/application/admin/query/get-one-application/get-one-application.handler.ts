import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Applications } from '@/features/careers/application/applications.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneApplicationQuery } from '@/features/careers/application/admin/query/get-one-application/get-one-application.request';
import { GetOneApplicationResponse } from '@/features/careers/application/admin/query/get-one-application/get-one-application.response';

@QueryHandler(GetOneApplicationQuery)
export class GetOneApplicationHandler implements IQueryHandler<GetOneApplicationQuery> {
  async execute(query: GetOneApplicationQuery): Promise<GetOneApplicationResponse> {
    const application = await Applications.findOneBy({ id: query.id });
    if (!application) throw new NotFoundException('Application with given id not found');
    return plainToInstance(GetOneApplicationResponse, application, { excludeExtraneousValues: true });
  }
}
