import { Command } from '@nestjs/cqrs';
import { CreateEventCategoryResponse } from '@/features/event/event-category/admin/commands/create-event-category/create-event-category.response';

export class CreateEventCategoryCommand extends Command<CreateEventCategoryResponse> {
  constructor(public title: string) {
    super();
  }
}
