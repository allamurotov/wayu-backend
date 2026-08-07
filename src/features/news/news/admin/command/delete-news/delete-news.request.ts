import { Command } from '@nestjs/cqrs';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteNewsRequest extends Command<void> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}
