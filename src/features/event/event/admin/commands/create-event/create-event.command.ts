import { Command } from '@nestjs/cqrs';
import { CreateEventResponse } from '@/features/event/event/admin/commands/create-event/create-event.response';

export class CreateEventCommand extends Command<CreateEventResponse> {
  constructor(
    public categoryId: number,
    public title: string,
    public image: Express.Multer.File,
    public date: string,
    public content: string,
  ) {
    super();
  }
}
