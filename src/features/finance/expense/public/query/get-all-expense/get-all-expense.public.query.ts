import { GetAllExpensePublicFilters } from './get-all-expense.public.filters';
import { Query } from '@nestjs/cqrs';
import { GetAllExpenseResponse } from '@/features/finance/expense/admin/query/get-all-expense/get-all-expense.response';
import { GetAllExpensePublicResponse } from '@/features/finance/expense/public/query/get-all-expense/get-all-expense.public.response';

export class GetAllExpensePublicQuery extends Query<GetAllExpensePublicResponse[]> {
  constructor(public readonly filters: GetAllExpensePublicFilters) {
    super();
  }
}
