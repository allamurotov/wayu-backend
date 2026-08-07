import { Command } from '@nestjs/cqrs';
import { CreateUserResponse } from '@/features/authentification/users/users/command/create-user/create-user.response';
import { Role } from '@/core/enum/enum';

export class CreateUserCommand extends Command<CreateUserResponse> {
  constructor(
    public role: Role,
    public userName: string,
    public fullName: string,
    public password: string,
    public birthDate: string,
    public isVerified: boolean,
    public isActive: boolean,
  ) {
    super();
  }
}
