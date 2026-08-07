import { BadRequestException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTagsResponse } from '@/features/common/tags/admin/command/create-tags/create-tags.response';
import { Tags } from '@/features/common/tags/tags.entity';
import { CreateTagsCommand } from '@/features/common/tags/admin/command/create-tags/create-tags.command';

@CommandHandler(CreateTagsCommand)
export class CreateTagsHandler implements ICommandHandler<CreateTagsCommand> {
  async execute(command: CreateTagsCommand): Promise<CreateTagsResponse> {
    const alreadyExists = await Tags.existsBy({ title: ILike(command.title) });

    if (alreadyExists) throw new BadRequestException('tags already exists');

    const tags = Tags.create({ title: command.title } as Tags);
    await Tags.save(tags);
    return plainToInstance(CreateTagsResponse, tags, { excludeExtraneousValues: true });
  }
}
