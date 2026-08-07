export class CreateExpenseCommand {
  constructor(
    public readonly amount: number,
    public readonly title: string,
    public readonly date: string,
    public readonly transactionId: string,
    public readonly description?: string,
  ) {}
}
