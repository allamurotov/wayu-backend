import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateExpenseCommand } from './update-expense.command';
import { Expenses } from '@/features/finance/expense/expenses.entity';
import { UpdateExpenseResponse } from './update-expense.response';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@CommandHandler(UpdateExpenseCommand)
export class UpdateExpenseHandler implements ICommandHandler<UpdateExpenseCommand> {
  async execute(command: UpdateExpenseCommand): Promise<UpdateExpenseResponse> {
    const expense = await Expenses.findOneBy({ id: command.id });
    if (!expense) {
      throw new NotFoundException(`Expense with given id not found`);
    }

    if (command.amount !== undefined) expense.amount = command.amount;
    if (command.date !== undefined) expense.date = command.date;
    if (command.title !== undefined) expense.title = command.title;
    if (command.description !== undefined) expense.description = command.description;
    if (command.transactionId !== undefined) expense.transactionId = command.transactionId;

    await Expenses.save(expense);

    return plainToInstance(UpdateExpenseResponse, expense, { excludeExtraneousValues: true });
  }
}
