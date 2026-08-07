import { Query } from '@nestjs/cqrs';
import { GetOneExpensePublicResponse } from '@/features/finance/expense/public/query/get-one-expense/get-one-expense.public.response';

export class GetOneExpensePublicQuery extends Query<GetOneExpensePublicResponse> {
  constructor(public id: number) {
    super();
  }
}
