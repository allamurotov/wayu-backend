import { Command } from '@nestjs/cqrs';
import { CreateLoginAdminResponse } from '@/features/authentification/login/command/create-login/create-login.admin.response';

export class CreateLoginAdminCommand extends Command<CreateLoginAdminResponse> {
  constructor(
    public userName: string,
    public password: string,
  ) {
    super();
  }
}
