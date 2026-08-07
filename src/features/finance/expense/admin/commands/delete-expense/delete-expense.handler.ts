import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteExpenseCommand } from './delete-expense.command';
import { Expenses } from '@/features/finance/expense/expenses.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteExpenseCommand)
export class DeleteExpenseHandler implements ICommandHandler<DeleteExpenseCommand> {
  async execute(command: DeleteExpenseCommand): Promise<void> {
    const expense = await Expenses.findOneBy({ id: command.id });
    if (!expense) {
      throw new NotFoundException(`Expense with given id not found`);
    }

    await Expenses.remove(expense);
  }
}
