import { Module } from '@nestjs/common';
import { NewsCategoryController } from '@/features/news/news-category/admin/news-category.admin.controller';
import { CreateNewsCategoryHandler } from '@/features/news/news-category/admin/command/create-news-category/create-news-category.handler';
import { GetAllNewsCategoryHandler } from '@/features/news/news-category/admin/query/get-all-news-category/get-all-news-category.handler';
import { DeleteNewsCategoryHandler } from '@/features/news/news-category/admin/command/delete-news-category/delete-news-category.handler';
import { GetOneNewsCategoryHandler } from '@/features/news/news-category/admin/query/get-one-news-category/get-one-news-category.handler';
import { UpdateNewsCategoryHandler } from '@/features/news/news-category/admin/command/update-news-category/update-news-category.handler';
import { CreateNewsHandler } from '@/features/news/news/admin/command/create-news/create-news.handler';
import { NewsController } from '@/features/news/news/admin/news.admin.controller';
import { GetAllNewsHandler } from '@/features/news/news/admin/query/get-all-news/get-all-news.handler';
import { GetOneNewsHandler } from '@/features/news/news/admin/query/get-one-news/get-one-news.handler';
import { DeleteNewsHandler } from '@/features/news/news/admin/command/delete-news/delete-news.handler';
import { UpdateNewsHandler } from '@/features/news/news/admin/command/update-news/update-news.handler';
import { NewsTagsController } from '@/features/news/news-tags/admin/news-tags.admin.controller';
import { CreateNewsTagHandler } from '@/features/news/news-tags/admin/command/create-news-tag/create-news-tag.handler';
import { DeleteNewsTagHandler } from '@/features/news/news-tags/admin/command/delete-news-tag/delete-news-tag.handler';
import { NewsCategoryPublicController } from '@/features/news/news-category/public/news-category.public.controller';
import { GetAllNewsCategoryPublicHandler } from '@/features/news/news-category/public/query/get-all-news-category/get-all-news-category.public.handler';
import { GetOneNewsCategoryPublicHandler } from '@/features/news/news-category/public/query/get-one-news-category/get-one-news-category.public.handler';
import { NewsPublicController } from '@/features/news/news/public/news.public.controller';
import { GetAllNewsPublicHandler } from '@/features/news/news/public/query/get-all-news/get-all-news.public.handler';
import { GetOneNewsPublicHandler } from '@/features/news/news/public/query/get-one-news/get-one-news.public.handler';

@Module({
  controllers: [NewsCategoryController, NewsController, NewsTagsController, NewsCategoryPublicController, NewsPublicController],
  providers: [
    CreateNewsCategoryHandler,
    GetAllNewsCategoryHandler,
    DeleteNewsCategoryHandler,
    GetOneNewsCategoryHandler,
    UpdateNewsCategoryHandler,
    CreateNewsHandler,
    GetAllNewsHandler,
    GetOneNewsHandler,
    DeleteNewsHandler,
    UpdateNewsHandler,
    CreateNewsTagHandler,
    DeleteNewsTagHandler,
    GetAllNewsCategoryPublicHandler,
    GetOneNewsCategoryPublicHandler,
    GetAllNewsPublicHandler,
    GetOneNewsPublicHandler,
  ],
})
export class NewsModule {}
