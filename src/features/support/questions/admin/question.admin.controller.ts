import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateQuestionResponse } from '@/features/support/questions/admin/command/create-question/create-question.response';
import { CreateQuestionRequest } from '@/features/support/questions/admin/command/create-question/create-question.request';
import { CreateQuestionCommand } from '@/features/support/questions/admin/command/create-question/create-question.command';
import { GetAllQuestionResponse } from '@/features/support/questions/admin/query/get-all-question/get-all-question.response';
import { GetAllQuestionFilters } from '@/features/support/questions/admin/query/get-all-question/get-all-question.filters';
import { GetAllQuestionQuery } from '@/features/support/questions/admin/query/get-all-question/get-all-question.query';
import { GetOneQuestionResponse } from '@/features/support/questions/admin/query/get-one-question/get-one-question.response';
import { GetOneQuestionQuery } from '@/features/support/questions/admin/query/get-one-question/get-one-question.request';
import { DeleteQuestionCommand } from '@/features/support/questions/admin/command/delete-question/delete-question.command';
import { UpdateQuestionResponse } from '@/features/support/questions/admin/command/update-question/update-question.response';
import { UpdateQuestionRequest } from '@/features/support/questions/admin/command/update-question/update-question.request';
import { UpdateQuestionCommand } from '@/features/support/questions/admin/command/update-question/update-question.command';

@Controller('admin/question')
@ApiTags('Question')
export class QuestionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateQuestionResponse })
  async createQuestion(@Body() payload: CreateQuestionRequest) {
    return await this.commandBus.execute(new CreateQuestionCommand(payload.fullName, payload.phoneNumber, payload.questions));
  }

  @Get()
  @ApiOkResponse({ type: [GetAllQuestionResponse] })
  async getAllQuestions(@Query() filters: GetAllQuestionFilters) {
    return await this.queryBus.execute(new GetAllQuestionQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneQuestionResponse })
  async getOneQuestion(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneQuestionQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteQuestionCommand(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateQuestionResponse })
  async updateQuestion(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateQuestionRequest) {
    return await this.commandBus.execute(new UpdateQuestionCommand(id, payload.fullName, payload.phoneNumber, payload.questions, payload.status));
  }
}
