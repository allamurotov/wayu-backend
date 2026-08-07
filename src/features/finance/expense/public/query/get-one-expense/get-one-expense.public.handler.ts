import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneExpensePublicQuery } from './get-one-expense.public.query';
import { Expenses } from '@/features/finance/expense/expenses.entity';
import { GetOneExpensePublicResponse } from './get-one-expense.public.response';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneExpensePublicQuery)
export class GetOneExpensePublicHandler implements IQueryHandler<GetOneExpensePublicQuery> {
  async execute(query: GetOneExpensePublicQuery): Promise<GetOneExpensePublicResponse> {
    const expense = await Expenses.findOneBy({ id: query.id });
    if (!expense) {
      throw new NotFoundException(`Expense with given id not found`);
    }

    return plainToInstance(GetOneExpensePublicResponse, expense, { excludeExtraneousValues: true });
  }
}
