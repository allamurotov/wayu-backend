import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLoginAdminCommand } from '@/features/authentification/login/command/create-login/create-login.admin.command';
import { CreateLoginAdminResponse } from '@/features/authentification/login/command/create-login/create-login.admin.response';
import { UnauthorizedException } from '@nestjs/common';
import argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { User } from '@/features/authentification/user.entity';

@CommandHandler(CreateLoginAdminCommand)
export class CreateLoginAdminHandler implements ICommandHandler<CreateLoginAdminCommand> {
  constructor(private readonly jwtService: JwtService) {}
  async execute(command: CreateLoginAdminCommand): Promise<CreateLoginAdminResponse> {
    let user = await User.findOneBy({ userName: command.userName });
    if (!user || !user.password) {
      throw new UnauthorizedException();
    }

    if (!user.isActive) {
      throw new UnauthorizedException();
    }

    let passwordsMatch = await argon2.verify(user.password, command.password);
    if (!passwordsMatch) {
      throw new UnauthorizedException();
    }

    let userPayload = {
      id: user.id,
      role: user.role,
    };

    let accessToken = this.jwtService.sign(userPayload);

    return plainToInstance(CreateLoginAdminResponse, accessToken, { excludeExtraneousValues: true });
  }
}
