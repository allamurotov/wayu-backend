import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteSocialLinkRequest {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
