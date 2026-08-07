import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { EventCategories } from '@/features/event/event-category/event-category.entity';
import { CreateEventCategoryResponse } from '@/features/event/event-category/admin/commands/create-event-category/create-event-category.response';
import { CreateEventCategoryCommand } from '@/features/event/event-category/admin/commands/create-event-category/create-event-category.command';

@CommandHandler(CreateEventCategoryCommand)
export class CreateEventCategoryHandler implements ICommandHandler<CreateEventCategoryCommand> {
  async execute(command: CreateEventCategoryCommand): Promise<CreateEventCategoryResponse> {
    const alreadyExists = await EventCategories.existsBy({ title: ILike(command.title) });

    if (alreadyExists) throw new BadRequestException('Event category already exists');

    const category = EventCategories.create({ title: command.title } as EventCategories);
    await EventCategories.save(category);
    return plainToInstance(CreateEventCategoryResponse, category, { excludeExtraneousValues: true });
  }
}
