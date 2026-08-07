import { GetAllExpenseFilters } from './get-all-expense.filters';
import { Query } from '@nestjs/cqrs';
import { GetAllExpenseResponse } from '@/features/finance/expense/admin/query/get-all-expense/get-all-expense.response';

export class GetAllExpenseQuery extends Query<GetAllExpenseResponse[]> {
  constructor(public readonly filters: GetAllExpenseFilters) {
    super();
  }
}
