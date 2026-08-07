import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateExpenseCommand } from './create-expense.command';
import { Expenses } from '@/features/finance/expense/expenses.entity';
import { CreateExpenseResponse } from './create-expense.response';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateExpenseCommand)
export class CreateExpenseHandler implements ICommandHandler<CreateExpenseCommand> {
  async execute(command: CreateExpenseCommand): Promise<CreateExpenseResponse> {
    const expense = Expenses.create({
      amount: command.amount,
      title: command.title,
      date: command.date,
      transactionId: command.transactionId,
      description: command.description,
    });

    await Expenses.save(expense);

    return plainToInstance(CreateExpenseResponse, expense, { excludeExtraneousValues: true });
  }
}
