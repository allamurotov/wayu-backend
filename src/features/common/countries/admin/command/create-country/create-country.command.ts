import { Command } from '@nestjs/cqrs';
import { CreateCountryResponse } from '@/features/common/countries/admin/command/create-country/create-country.response';

export class CreateCountryCommand extends Command<CreateCountryResponse> {
  constructor(
    public title: string,
    public flag: Express.Multer.File,
  ) {
    super();
  }
}
