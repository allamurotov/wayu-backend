import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Events } from '@/features/event/event/events.entity';
import { UpdateEventCommand } from '@/features/event/event/admin/commands/update-event/update-event.command';
import { UpdateEventResponse } from '@/features/event/event/admin/commands/update-event/update-event.response';

@CommandHandler(UpdateEventCommand)
export class UpdateEventHandler implements ICommandHandler<UpdateEventCommand> {
  async execute(command: UpdateEventCommand): Promise<UpdateEventResponse> {
    const event = await Events.findOneBy({ id: command.id });
    if (!event) throw new NotFoundException('Event with given id not found');

    if (command.categoryId !== undefined) event.categoryId = command.categoryId;

    if (command.title !== undefined) event.title = command.title;

    if (command.image !== undefined) event.image = command.image.path;

    if (command.date !== undefined) event.date = command.date;

    if (command.content !== undefined) event.content = command.content;

    await Events.save(event);
    return plainToInstance(UpdateEventResponse, event, { excludeExtraneousValues: true });
  }
}
