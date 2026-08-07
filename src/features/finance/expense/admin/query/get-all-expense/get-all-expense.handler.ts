import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllExpenseQuery } from './get-all-expense.query';
import { Expenses } from '@/features/finance/expense/expenses.entity';
import { GetAllExpenseResponse } from './get-all-expense.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllExpenseQuery)
export class GetAllExpenseHandler implements IQueryHandler<GetAllExpenseQuery> {
  async execute(query: GetAllExpenseQuery): Promise<GetAllExpenseResponse[]> {
    const take = query.filters.limit ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const expense = await Expenses.find({ skip: skip, take: take });
    return plainToInstance(GetAllExpenseResponse, expense, { excludeExtraneousValues: true });
  }
}
