import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from '@/features/news/news.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CommonModule } from '@/features/common/common.module';
import { NetworkModule } from '@/features/network/network.module';
import { LibraryModule } from '@/features/library/library.module';
import { CareersModule } from '@/features/careers/careers.module';
import { SupportModule } from '@/features/support/support.module';
import { FinanceModule } from '@/features/finance/finance.module';
import { EventModule } from '@/features/event/event.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleConfig } from '@/config/jwt-config';
import { AuthModule } from '@/features/authentification/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from '@/core/guards/authentification.guard';
import { RolesGuard } from '@/core/guards/roles.guard';

@Module({
  imports: [
    JwtModule.register(jwtModuleConfig),
    TypeOrmModule.forRoot(typeOrmConfig),
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_URL: Joi.string().required(),
        DEFAULT_DB_URL: Joi.string().required(),
        TEST_DB_URL: Joi.string().required(),
        DEFAULT_SIZE: Joi.number().required(),
        DEFAULT_PAGE: Joi.number().required(),
        BASE_URL: Joi.string().required(),
      }),
    }),
    NewsModule,
    CommonModule,
    NetworkModule,
    LibraryModule,
    CareersModule,
    SupportModule,
    FinanceModule,
    AuthModule,
    EventModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
