import { Query } from '@nestjs/cqrs';
import { GetOneNewsResponse } from '@/features/news/news/admin/query/get-one-news/get-one-news.response';

export class GetOneNewsCommand extends Query<GetOneNewsResponse> {
  constructor(public id: number) {
    super();
  }
}
