import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllExpensePublicQuery } from './get-all-expense.public.query';
import { Expenses } from '@/features/finance/expense/expenses.entity';
import { GetAllExpensePublicResponse } from './get-all-expense.public.response';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllExpensePublicQuery)
export class GetAllExpensePublicHandler implements IQueryHandler<GetAllExpensePublicQuery> {
  async execute(query: GetAllExpensePublicQuery): Promise<GetAllExpensePublicResponse[]> {
    const take = query.filters.limit ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const expense = await Expenses.find({ skip: skip, take: take });
    return plainToInstance(GetAllExpensePublicResponse, expense, { excludeExtraneousValues: true });
  }
}
