import { Module } from '@nestjs/common';
import { DonationsAdminController } from '@/features/finance/donations/admin/donations-admin.controller';
import { DeleteAdminDonationsHandler } from '@/features/finance/donations/admin/command/delete-donations/delete-admin-donations.handler';
import { GetAllAdminDonationsHandler } from '@/features/finance/donations/admin/query/get-all-donations/get-all-admin-donations.handler';
import { GetOneAdminDonationsHandler } from '@/features/finance/donations/admin/query/get-one-donations/get-one-admin-donations.handler';
import { DonationsPublicController } from '@/features/finance/donations/public/donations-public.controller';
import { CreatePublicDonationsHandler } from '@/features/finance/donations/public/command/create-donations/create-public-donations.handler';
import { GetAllPublicDonationsHandler } from '@/features/finance/donations/public/query/get-all-donations/get-all-public-donations.handler';
import { GetOnePublicDonationsHandler } from '@/features/finance/donations/public/query/get-one-donations/get-one-admin-donations.handler';
import { ExpenseAdminController } from '@/features/finance/expense/admin/expense-admin.controller';
import { CreateExpenseHandler } from '@/features/finance/expense/admin/commands/create-expense/create-expense.handler';
import { UpdateExpenseHandler } from '@/features/finance/expense/admin/commands/update-expense/update-expense.handler';
import { DeleteExpenseHandler } from '@/features/finance/expense/admin/commands/delete-expense/delete-expense.handler';
import { GetAllExpenseHandler } from '@/features/finance/expense/admin/query/get-all-expense/get-all-expense.handler';
import { GetOneExpenseHandler } from '@/features/finance/expense/admin/query/get-one-expense/get-one-expense.handler';
import { ExpensePublicController } from '@/features/finance/expense/public/expense-public.controller';
import { GetAllExpensePublicHandler } from '@/features/finance/expense/public/query/get-all-expense/get-all-expense.public.handler';
import { GetOneExpensePublicHandler } from '@/features/finance/expense/public/query/get-one-expense/get-one-expense.public.handler';

@Module({
  controllers: [DonationsAdminController, DonationsPublicController, ExpenseAdminController, ExpensePublicController],
  providers: [
    DeleteAdminDonationsHandler,
    GetAllAdminDonationsHandler,
    GetOneAdminDonationsHandler,
    CreatePublicDonationsHandler,
    GetAllPublicDonationsHandler,
    GetOnePublicDonationsHandler,
    CreateExpenseHandler,
    UpdateExpenseHandler,
    DeleteExpenseHandler,
    GetAllExpenseHandler,
    GetOneExpenseHandler,
    GetAllExpensePublicHandler,
    GetOneExpensePublicHandler,
  ],
})
export class FinanceModule {}
