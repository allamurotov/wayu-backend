import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { CreateFaqsTagRequest } from '@/features/support/faqs-tags/admin/command/create-faqs-tag/create-faqs-tag.request';
import { CreateFaqsTagCommand } from '@/features/support/faqs-tags/admin/command/create-faqs-tag/create-faqs-tag.command';
import { DeleteFaqsTagCommand } from '@/features/support/faqs-tags/admin/command/delete-faqs-tag/delete-faqs-tag.command';

@Controller('admin/faqs-tags')
@ApiTags('Faqs-Tags')
export class FaqsTagsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createNewsTag(@Body() payload: CreateFaqsTagRequest) {
    let cmd = new CreateFaqsTagCommand(payload.faqsId, payload.tagId);
    return await this.commandBus.execute(cmd);
  }

  @Delete(':id')
  async deleteFaqsTags(@Param('id', ParseIntPipe) id: number) {
    let cmd = new DeleteFaqsTagCommand(id, 0);
    return await this.commandBus.execute(cmd);
  }
}
