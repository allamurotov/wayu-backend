import { Module } from '@nestjs/common';
import { EventController } from '@/features/event/event/admin/event.admin.controller';
import { CreateEventHandler } from '@/features/event/event/admin/commands/create-event/create-event.handler';
import { UpdateEventHandler } from '@/features/event/event/admin/commands/update-event/update-event.handler';
import { DeleteEventHandler } from '@/features/event/event/admin/commands/delete-event/delete-event.handler';
import { GetAllEventHandler } from '@/features/event/event/admin/query/get-all-event/get-all-event.handler';
import { GetOneEventHandler } from '@/features/event/event/admin/query/get-one-event/get-one-event.handler';
import { EventCategoryController } from '@/features/event/event-category/admin/event-category.admin.controller';
import { CreateEventCategoryHandler } from '@/features/event/event-category/admin/commands/create-event-category/create-event-category.handler';
import { UpdateEventCategoryHandler } from '@/features/event/event-category/admin/commands/update-event-category/update-event-category.handler';
import { DeleteEventCategoryHandler } from '@/features/event/event-category/admin/commands/delete-event-category/delete-event-category.handler';
import { GetAllEventCategoryHandler } from '@/features/event/event-category/admin/query/get-all-event-category/get-all-event-category.handler';
import { GetOneEventCategoryHandler } from '@/features/event/event-category/admin/query/get-one-event-category/get-one-event-category.handler';
import { EventPublicController } from '@/features/event/event/public/event.public.controller';
import { GetAllEventPublicHandler } from '@/features/event/event/public/query/get-all-event/get-all-event.public.handler';
import { GetOneEventPublicHandler } from '@/features/event/event/public/query/get-one-event/get-one-event.public.handler';
import { EventCategoryPublicController } from '@/features/event/event-category/public/event-category.public.controller';
import { GetOneEventCategoryPublicHandler } from '@/features/event/event-category/public/query/get-one-event-category/get-one-event-category.public.handler';
import { GetAllEventCategoryPublicHandler } from '@/features/event/event-category/public/query/get-all-event-category/get-all-event-category.public.handler';

@Module({
  controllers: [EventController, EventCategoryController, EventPublicController, EventCategoryPublicController],
  providers: [
    CreateEventHandler,
    UpdateEventHandler,
    DeleteEventHandler,
    GetAllEventHandler,
    GetOneEventHandler,
    CreateEventCategoryHandler,
    UpdateEventCategoryHandler,
    DeleteEventCategoryHandler,
    GetAllEventCategoryHandler,
    GetOneEventCategoryHandler,
    GetAllEventPublicHandler,
    GetOneEventPublicHandler,
    GetAllEventCategoryPublicHandler,
    GetOneEventCategoryPublicHandler,
  ],
})
export class EventModule {}
