import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Applications } from '@/features/careers/application/applications.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneApplicationPublicQuery } from '@/features/careers/application/public/query/get-one-application/get-one-application.public.request';
import { GetOneApplicationPublicResponse } from '@/features/careers/application/public/query/get-one-application/get-one-application.public.response';

@QueryHandler(GetOneApplicationPublicQuery)
export class GetOneApplicationPublicHandler implements IQueryHandler<GetOneApplicationPublicQuery> {
  async execute(query: GetOneApplicationPublicQuery): Promise<GetOneApplicationPublicResponse> {
    const application = await Applications.findOneBy({ id: query.id });
    if (!application) throw new NotFoundException('Application with given id not found');
    return plainToInstance(GetOneApplicationPublicResponse, application, { excludeExtraneousValues: true });
  }
}
