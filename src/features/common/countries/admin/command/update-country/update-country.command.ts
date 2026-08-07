import { Command } from '@nestjs/cqrs';
import { UpdateCountryResponse } from '@/features/common/countries/admin/command/update-country/update-country.response';

export class UpdateCountryCommand extends Command<UpdateCountryResponse> {
  constructor(
    public id?: number,
    public title?: string,
    public flag?: Express.Multer.File,
  ) {
    super();
  }
}
