import { Module } from '@nestjs/common';
import { LoginController } from '@/features/authentification/login/login.controller';
import { CreateLoginAdminHandler } from '@/features/authentification/login/command/create-login/create-login.admin.handler';
import { UserController } from '@/features/authentification/users/user.controller';
import { CreateUserHandler } from '@/features/authentification/users/users/command/create-user/create-user.handler';

@Module({
  controllers: [LoginController, UserController],
  providers: [CreateLoginAdminHandler, CreateUserHandler],
})
export class AuthModule {}
