import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { EventCategories } from '@/features/event/event-category/event-category.entity';
import { Events } from '@/features/event/event/events.entity';
import { CreateEventCommand } from '@/features/event/event/admin/commands/create-event/create-event.command';
import { CreateEventResponse } from '@/features/event/event/admin/commands/create-event/create-event.response';

@CommandHandler(CreateEventCommand)
export class CreateEventHandler implements ICommandHandler<CreateEventCommand> {
  async execute(command: CreateEventCommand): Promise<CreateEventResponse> {
    const categoryExists = await EventCategories.existsBy({ id: command.categoryId });
    if (!categoryExists) throw new NotFoundException('Event category with given id not found');

    const event = {
      categoryId: command.categoryId,
      title: command.title,
      image: command.image.path,
      date: command.date,
      content: command.content,
    } as Events;

    await Events.save(event);
    return plainToInstance(CreateEventResponse, event, { excludeExtraneousValues: true });
  }
}
