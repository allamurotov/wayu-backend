import { Module } from '@nestjs/common';
import { CreateApplicationHandler } from '@/features/careers/application/admin/commands/create-application/create-application.handler';
import { UpdateApplicationHandler } from '@/features/careers/application/admin/commands/update-application/update-application.handler';
import { DeleteApplicationHandler } from '@/features/careers/application/admin/commands/delete-application/delete-application.handler';
import { GetAllApplicationHandler } from '@/features/careers/application/admin/query/get-all-application/get-all-application.handler';
import { GetOneApplicationHandler } from '@/features/careers/application/admin/query/get-one-application/get-one-application.handler';
import { ApplicationAdminController } from '@/features/careers/application/admin/application.admin.controller';
import { GetAllApplicationPublicHandler } from '@/features/careers/application/public/query/get-all-application/get-all-application.public.handler';
import { GetOneApplicationPublicHandler } from '@/features/careers/application/public/query/get-one-application/get-one-application.public.handler';
import { ApplicationPublicController } from '@/features/careers/application/public/application.public.controller';
import { VacancyAdminController } from '@/features/careers/vacancy/admin/vacancy.admin.controller';
import { CreateVacancyHandler } from '@/features/careers/vacancy/admin/command/create-vacancy/create-vacancy.handler';
import { UpdateVacancyHandler } from '@/features/careers/vacancy/admin/command/update-vacancy/update-vacancy.handler';
import { DeleteVacancyHandler } from '@/features/careers/vacancy/admin/command/delete-vacancy/delete-vacancy.handler';
import { GetAllVacancyHandler } from '@/features/careers/vacancy/admin/query/get-all-vacancy/get-all-vacancy.handler';
import { GetOneVacancyHandler } from '@/features/careers/vacancy/admin/query/get-one-vacancy/get-one-vacancy.handler';
import { VacancyPublicController } from '@/features/careers/vacancy/public/vacancy.public.controller';
import { GetOneVacancyPublicHandler } from '@/features/careers/vacancy/public/query/get-one-vacancy/get-one-vacancy.public.handler';
import { GetAllVacancyPublicHandler } from '@/features/careers/vacancy/public/query/get-all-vacancy/get-all-vacancy.public.handler';

@Module({
  controllers: [VacancyAdminController, VacancyPublicController, ApplicationAdminController, ApplicationPublicController],
  providers: [
    CreateVacancyHandler,
    UpdateVacancyHandler,
    DeleteVacancyHandler,
    GetAllVacancyHandler,
    GetOneVacancyHandler,
    CreateApplicationHandler,
    UpdateApplicationHandler,
    DeleteApplicationHandler,
    GetAllApplicationHandler,
    GetOneApplicationHandler,
    GetAllApplicationPublicHandler,
    GetOneApplicationPublicHandler,
    GetOneVacancyPublicHandler,
    GetAllVacancyPublicHandler,
  ],
})
export class CareersModule {}
