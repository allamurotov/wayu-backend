import { Module } from '@nestjs/common';
import { AuthorController } from '@/features/library/author/admin/author.admin.controller';
import { CreateAuthorHandler } from '@/features/library/author/admin/command/create-author/create-author.handler';
import { UpdateAuthorHandler } from '@/features/library/author/admin/command/update-author/update-author.handler';
import { DeleteAuthorHandler } from '@/features/library/author/admin/command/delete-author/delete-author.handler';
import { GetAllAuthorHandler } from '@/features/library/author/admin/query/get-all-author/get-all-author.handler';
import { GetOneAuthorHandler } from '@/features/library/author/admin/query/get-one-author/get-one-author.handler';
import { BookCategoryController } from '@/features/library/book-category/admin/book-category.admin.controller';
import { CreateBookCategoryHandler } from '@/features/library/book-category/admin/command/create-book-category/create-book-category.handler';
import { UpdateBookCategoryHandler } from '@/features/library/book-category/admin/command/update-book-category/update-book-category.handler';
import { DeleteBookCategoryHandler } from '@/features/library/book-category/admin/command/delete-book-category/delete-book-category.handler';
import { GetAllBookCategoryHandler } from '@/features/library/book-category/admin/query/get-all-book-category/get-all-book-category.handler';
import { GetOneBookCategoryHandler } from '@/features/library/book-category/admin/query/get-one-book-category/get-one-book-category.handler';
import { BookController } from '@/features/library/book/admin/book.admin.controller';
import { CreateBookHandler } from '@/features/library/book/admin/command/create-book/create-book.handler';
import { UpdateBookHandler } from '@/features/library/book/admin/command/update-book/update-book.handler';
import { DeleteBookHandler } from '@/features/library/book/admin/command/delete-book/delete-book.handler';
import { GetAllBookHandler } from '@/features/library/book/admin/query/get-all-book/get-all-book.handler';
import { GetOneBookHandler } from '@/features/library/book/admin/query/get-one-book/get-one-book.handler';
import { AuthorPublicController } from '@/features/library/author/public/author.public.controller';
import { GetAllAuthorPublicHandler } from '@/features/library/author/public/query/get-all-author/get-all-author.public.handler';
import { GetOneAuthorPublicHandler } from '@/features/library/author/public/query/get-one-author/get-one-author.public.handler';
import { GetAllBookPublicHandler } from '@/features/library/book/public/query/get-all-book/get-all-book.public.handler';
import { GetOneBookPublicHandler } from '@/features/library/book/public/query/get-one-book/get-one-book.public.handler';
import { BookPublicController } from '@/features/library/book/public/book.public.controller';
import { GetOneBookCategoryPublicHandler } from '@/features/library/book-category/public/query/get-one-book-category/get-one-book-category.public.handler';
import { GetAllBookCategoryPublicHandler } from '@/features/library/book-category/public/query/get-all-book-category/get-all-book-category.public.handler';
import { BookCategoryPublicController } from '@/features/library/book-category/public/book-category.public.controller';

@Module({
  controllers: [AuthorController, BookCategoryController, BookController, AuthorPublicController, BookCategoryPublicController, BookPublicController],
  providers: [
    CreateAuthorHandler,
    UpdateAuthorHandler,
    DeleteAuthorHandler,
    GetAllAuthorHandler,
    GetOneAuthorHandler,
    CreateBookCategoryHandler,
    UpdateBookCategoryHandler,
    DeleteBookCategoryHandler,
    GetAllBookCategoryHandler,
    GetOneBookCategoryHandler,
    CreateBookHandler,
    UpdateBookHandler,
    DeleteBookHandler,
    GetAllBookHandler,
    GetOneBookHandler,
    GetAllAuthorPublicHandler,
    GetOneAuthorPublicHandler,
    GetAllBookCategoryPublicHandler,
    GetOneBookCategoryPublicHandler,
    GetAllBookPublicHandler,
    GetOneBookPublicHandler,
  ],
})
export class LibraryModule {}
