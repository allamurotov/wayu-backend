import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateExpenseResponse } from '@/features/finance/expense/admin/commands/create-expense/create-expense.response';
import { CreateExpenseRequest } from '@/features/finance/expense/admin/commands/create-expense/create-expense.request';
import { CreateExpenseCommand } from '@/features/finance/expense/admin/commands/create-expense/create-expense.command';
import { UpdateExpenseRequest } from '@/features/finance/expense/admin/commands/update-expense/update-expense.request';
import { UpdateExpenseCommand } from '@/features/finance/expense/admin/commands/update-expense/update-expense.command';
import { GetAllExpenseResponse } from '@/features/finance/expense/admin/query/get-all-expense/get-all-expense.response';
import { GetAllExpenseFilters } from '@/features/finance/expense/admin/query/get-all-expense/get-all-expense.filters';
import { GetAllExpenseQuery } from '@/features/finance/expense/admin/query/get-all-expense/get-all-expense.query';
import { GetOneExpenseResponse } from '@/features/finance/expense/admin/query/get-one-expense/get-one-expense.response';
import { GetOneExpenseQuery } from '@/features/finance/expense/admin/query/get-one-expense/get-one-expense.query';
import { DeleteExpenseCommand } from '@/features/finance/expense/admin/commands/delete-expense/delete-expense.command';
import { UpdateExpenseResponse } from '@/features/finance/expense/admin/commands/update-expense/update-expense.response';

@Controller('admin/expense')
@ApiTags('Expense-Admin')
export class ExpenseAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateExpenseResponse })
  async createExpense(@Body() payload: CreateExpenseRequest) {
    let cmd = new CreateExpenseCommand(payload.amount, payload.title, payload.date, payload.transactionId, payload.description);
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllExpenseResponse] })
  async getAllExpenses(@Query() filters: GetAllExpenseFilters) {
    return await this.queryBus.execute(new GetAllExpenseQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneExpenseResponse })
  async getOneExpense(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneExpenseQuery(id));
  }

  @Delete(':id')
  async deleteExpense(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteExpenseCommand(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateExpenseResponse })
  async updateExpense(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateExpenseRequest) {
    const cmd = new UpdateExpenseCommand(id, payload.amount, payload.date, payload.title, payload.description, payload.transactionId);
    return await this.commandBus.execute(cmd);
  }
}
