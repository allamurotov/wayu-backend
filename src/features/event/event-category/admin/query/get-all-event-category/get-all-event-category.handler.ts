import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllEventCategoryQuery } from '@/features/event/event-category/admin/query/get-all-event-category/get-all-event-category.query';
import { GetAllEventCategoryResponse } from '@/features/event/event-category/admin/query/get-all-event-category/get-all-event-category.response';
import { EventCategories } from '@/features/event/event-category/event-category.entity';

@QueryHandler(GetAllEventCategoryQuery)
export class GetAllEventCategoryHandler implements IQueryHandler<GetAllEventCategoryQuery> {
  async execute(query: GetAllEventCategoryQuery): Promise<GetAllEventCategoryResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const categories = await EventCategories.find({ skip, take });
    return plainToInstance(GetAllEventCategoryResponse, categories, { excludeExtraneousValues: true });
  }
}
