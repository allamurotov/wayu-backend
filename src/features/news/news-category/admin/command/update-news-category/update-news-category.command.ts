import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Command } from '@nestjs/cqrs';
import { UpdateNewsCategoryResponse } from './update-news-category.response';

export class UpdateNewsCategoryCommand extends Command<UpdateNewsCategoryResponse> {
  @IsNumber()
  @ApiHideProperty()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsString()
  @MaxLength(64)
  @ApiProperty()
  title?: string;
}
