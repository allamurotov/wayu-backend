import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneStaticInfoQuery } from '@/features/common/static-info/admin/query/get-one-static-info/get-one-static-info.query';
import { GetOneStaticInfoResponse } from '@/features/common/static-info/admin/query/get-one-static-info/get-one-static-info.response';
import { StaticInfo } from '@/features/common/static-info/staticInfo.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneStaticInfoQuery)
export class GetOneStaticInfoHandler implements IQueryHandler<GetOneStaticInfoQuery> {
  async execute(query: GetOneStaticInfoQuery): Promise<GetOneStaticInfoResponse> {
    const staticInfo = await StaticInfo.findOneBy({ id: query.id });

    if (!staticInfo) throw new NotFoundException('Static info with given id not found');

    return plainToInstance(GetOneStaticInfoResponse, staticInfo, { excludeExtraneousValues: true });
  }
}
