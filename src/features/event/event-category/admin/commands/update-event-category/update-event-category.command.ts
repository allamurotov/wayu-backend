import { Command } from '@nestjs/cqrs';
import { UpdateEventCategoryResponse } from '@/features/event/event-category/admin/commands/update-event-category/update-event-category.response';

export class UpdateEventCategoryCommand extends Command<UpdateEventCategoryResponse> {
  constructor(
    public id: number,
    public title?: string,
  ) {
    super();
  }
}
