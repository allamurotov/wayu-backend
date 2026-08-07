import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllQuestionPublicResponse } from '@/features/support/questions/public/query/get-all-question/get-all-question.public.response';
import { GetAllQuestionPublicFilters } from '@/features/support/questions/public/query/get-all-question/get-all-question.public.filters';
import { GetAllQuestionPublicQuery } from '@/features/support/questions/public/query/get-all-question/get-all-question.public.query';
import { GetOneQuestionPublicResponse } from '@/features/support/questions/public/query/get-one-question/get-one-question.public.response';
import { GetOneQuestionPublicQuery } from '@/features/support/questions/public/query/get-one-question/get-one-question.public.request';
import { CreateQuestionPublicRequest } from '@/features/support/questions/public/command/create-question/create-question.public.request';
import { CreateQuestionPublicResponse } from '@/features/support/questions/public/command/create-question/create-question.public.response';
import { CreateQuestionPublicCommand } from '@/features/support/questions/public/command/create-question/create-question.public.command';

@Controller('public/question')
@ApiTags('Question-public')
export class QuestionPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateQuestionPublicResponse })
  async createQuestion(@Body() payload: CreateQuestionPublicRequest) {
    const cmd = new CreateQuestionPublicCommand(payload.fullName, payload.phoneNumber, payload.questions, payload.email);
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllQuestionPublicResponse] })
  async getAllQuestions(@Query() filters: GetAllQuestionPublicFilters) {
    return await this.queryBus.execute(new GetAllQuestionPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneQuestionPublicResponse })
  async getOneQuestion(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneQuestionPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
