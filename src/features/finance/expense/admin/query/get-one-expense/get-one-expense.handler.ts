import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetOneExpenseQuery } from './get-one-expense.query';
import { Expenses } from '@/features/finance/expense/expenses.entity';
import { GetOneExpenseResponse } from './get-one-expense.response';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneExpenseQuery)
export class GetOneExpenseHandler implements IQueryHandler<GetOneExpenseQuery> {
  async execute(query: GetOneExpenseQuery): Promise<GetOneExpenseResponse> {
    const expense = await Expenses.findOneBy({ id: query.id });
    if (!expense) {
      throw new NotFoundException(`Expense with given id not found`);
    }

    return plainToInstance(GetOneExpenseResponse, expense, { excludeExtraneousValues: true });
  }
}
