import { Query } from '@nestjs/cqrs';
import { GetOneExpenseResponse } from '@/features/finance/expense/admin/query/get-one-expense/get-one-expense.response';

export class GetOneExpenseQuery extends Query<GetOneExpenseResponse> {
  constructor(public id: number) {
    super();
  }
}
