import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '@/features/authentification/users/users/command/create-user/create-user.command';
import { CreateUserResponse } from '@/features/authentification/users/users/command/create-user/create-user.response';
import { User } from '@/features/authentification/user.entity';
import { plainToInstance } from 'class-transformer';
import argon2 from 'argon2';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Role } from '@/core/enum/enum';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  async execute(cmd: CreateUserCommand): Promise<CreateUserResponse> {
    const alreadyExists = await User.findOneBy({ userName: cmd.userName });
    if (alreadyExists) {
      throw new BadRequestException('userName alreadyExists');
    }

    const passwordHash = await argon2.hash(cmd.password);

    const user = User.create({
      role: cmd.role,
      userName: cmd.userName,
      fullName: cmd.fullName,
      password: passwordHash,
      birthDate: cmd.birthDate,
      isVerified: cmd.isVerified,
      isActive: cmd.isActive,
    });

    await User.save(user);
    return plainToInstance(CreateUserResponse, user, { excludeExtraneousValues: true });
  }
}
