import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneEventCategoryQuery } from '@/features/event/event-category/admin/query/get-one-event-category/get-one-event-category.request';
import { GetOneEventCategoryResponse } from '@/features/event/event-category/admin/query/get-one-event-category/get-one-event-category.response';
import { EventCategories } from '@/features/event/event-category/event-category.entity';
import { GetOneEventCategoryPublicQuery } from '@/features/event/event-category/public/query/get-one-event-category/get-one-event-category.public.request';

@QueryHandler(GetOneEventCategoryPublicQuery)
export class GetOneEventCategoryPublicHandler implements IQueryHandler<GetOneEventCategoryQuery> {
  async execute(query: GetOneEventCategoryQuery): Promise<GetOneEventCategoryResponse> {
    const category = await EventCategories.findOneBy({ id: query.id });

    if (!category) throw new NotFoundException('Event category with given id not found');

    return plainToInstance(GetOneEventCategoryResponse, category, { excludeExtraneousValues: true });
  }
}
