import { Command } from '@nestjs/cqrs';
import { UpdateExpenseResponse } from '@/features/finance/expense/admin/commands/update-expense/update-expense.response';

export class UpdateExpenseCommand extends Command<UpdateExpenseResponse> {
  constructor(
    public readonly id: number,
    public readonly amount?: number,
    public readonly date?: string,
    public readonly title?: string,
    public readonly description?: string,
    public readonly transactionId?: string,
  ) {
    super();
  }
}
