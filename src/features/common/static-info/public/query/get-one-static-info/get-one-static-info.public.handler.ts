import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { StaticInfo } from '@/features/common/static-info/staticInfo.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneStaticInfoPublicQuery } from '@/features/common/static-info/public/query/get-one-static-info/get-one-static-info.public.query';
import { GetOneStaticInfoPublicResponse } from '@/features/common/static-info/public/query/get-one-static-info/get-one-static-info.public.response';

@QueryHandler(GetOneStaticInfoPublicQuery)
export class GetOneStaticInfoPublicHandler implements IQueryHandler<GetOneStaticInfoPublicQuery> {
  async execute(query: GetOneStaticInfoPublicQuery): Promise<GetOneStaticInfoPublicResponse> {
    const staticInfo = await StaticInfo.findOneBy({ id: query.id });
    if (!staticInfo) throw new NotFoundException('Static info with given id not found');
    return plainToInstance(GetOneStaticInfoPublicResponse, staticInfo, { excludeExtraneousValues: true });
  }
}
