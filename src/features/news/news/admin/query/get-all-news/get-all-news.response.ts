import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { GetAllNewsCategoryResponse } from '@/features/news/news-category/admin/query/get-all-news-category/get-all-news-category.response';
import { GetAllCountryResponse } from '@/features/common/countries/admin/query/get-all-country/get-all-country.response';

export class GetAllNewsResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  @Type(() => GetAllNewsCategoryResponse)
  category!: GetAllNewsCategoryResponse;

  @Expose()
  @ApiProperty()
  @Type(() => GetAllCountryResponse)
  country!: GetAllCountryResponse;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  image!: string;

  @Expose()
  @ApiProperty()
  date!: string;

  @Expose()
  @ApiProperty()
  content!: string;

  @Expose()
  @ApiProperty()
  createdAt!: string;

  @Expose()
  @ApiProperty()
  updatedAt?: string;
}
