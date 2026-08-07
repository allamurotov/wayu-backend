import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllExpensePublicResponse } from '@/features/finance/expense/public/query/get-all-expense/get-all-expense.public.response';
import { GetAllExpensePublicFilters } from '@/features/finance/expense/public/query/get-all-expense/get-all-expense.public.filters';
import { GetAllExpensePublicQuery } from '@/features/finance/expense/public/query/get-all-expense/get-all-expense.public.query';
import { GetOneExpensePublicResponse } from '@/features/finance/expense/public/query/get-one-expense/get-one-expense.public.response';
import { GetOneExpensePublicQuery } from '@/features/finance/expense/public/query/get-one-expense/get-one-expense.public.query';

@Controller('public/expense')
@ApiTags('Expense-Public')
export class ExpensePublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetAllExpensePublicResponse] })
  async getAllExpenses(@Query() filters: GetAllExpensePublicFilters) {
    return await this.queryBus.execute(new GetAllExpensePublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneExpensePublicResponse })
  async getOneExpense(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneExpensePublicQuery(id));
  }
}
