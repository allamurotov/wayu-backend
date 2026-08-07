import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { EventCategories } from '@/features/event/event-category/event-category.entity';
import { UpdateEventCategoryCommand } from '@/features/event/event-category/admin/commands/update-event-category/update-event-category.command';
import { UpdateEventCategoryResponse } from '@/features/event/event-category/admin/commands/update-event-category/update-event-category.response';

@CommandHandler(UpdateEventCategoryCommand)
export class UpdateEventCategoryHandler implements ICommandHandler<UpdateEventCategoryCommand> {
  async execute(command: UpdateEventCategoryCommand): Promise<UpdateEventCategoryResponse> {
    const category = await EventCategories.findOneBy({ id: command.id });

    if (!category) throw new NotFoundException('Event category with given id not found');

    if (command.title !== undefined) category.title = command.title;

    await EventCategories.save(category);
    return plainToInstance(UpdateEventCategoryResponse, category, { excludeExtraneousValues: true });
  }
}
