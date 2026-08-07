import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserRequest } from '@/features/authentification/users/users/command/create-user/create-user.request';
import { CreateUserResponse } from '@/features/authentification/users/users/command/create-user/create-user.response';
import { CreateUserCommand } from '@/features/authentification/users/users/command/create-user/create-user.command';
import { Role } from '@/core/enum/enum';
import { Roles } from '@/core/decorator/roles.decorator';

@Controller('admin/user')
@ApiTags('User-Admin')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiCreatedResponse({ type: CreateUserResponse })
  async createUser(@Body() payload: CreateUserRequest) {
    let cmd = new CreateUserCommand(payload.role, payload.userName, payload.fullName, payload.password, payload.birthDate, payload.isVerified, payload.isActive);

    return await this.commandBus.execute(cmd);
  }
}
