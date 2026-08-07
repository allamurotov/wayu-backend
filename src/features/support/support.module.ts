import { Module } from '@nestjs/common';
import { QuestionController } from '@/features/support/questions/admin/question.admin.controller';
import { CreateQuestionHandler } from '@/features/support/questions/admin/command/create-question/create-question.handler';
import { UpdateQuestionHandler } from '@/features/support/questions/admin/command/update-question/update-question.handler';
import { DeleteQuestionHandler } from '@/features/support/questions/admin/command/delete-question/delete-question.handler';
import { GetAllQuestionHandler } from '@/features/support/questions/admin/query/get-all-question/get-all-question.handler';
import { GetOneQuestionHandler } from '@/features/support/questions/admin/query/get-one-question/get-one-question.handler';
import { FaqController } from '@/features/support/faqs/admin/faq.admin.controller';
import { CreateFaqHandler } from '@/features/support/faqs/admin/command/create-faq/create-faq.handler';
import { UpdateFaqHandler } from '@/features/support/faqs/admin/command/update-faq/update-faq.handler';
import { DeleteFaqHandler } from '@/features/support/faqs/admin/command/delete-faq/delete-faq.handler';
import { GetAllFaqHandler } from '@/features/support/faqs/admin/query/get-all-faq/get-all-faq.handler';
import { GetOneFaqHandler } from '@/features/support/faqs/admin/query/get-one-faq/get-one-faq.handler';
import { FaqsTagsController } from '@/features/support/faqs-tags/admin/faqs-tags.admin.controller';
import { CreateFaqsTagHandler } from '@/features/support/faqs-tags/admin/command/create-faqs-tag/create-faqs-tag.handler';
import { DeleteFaqsTagHandler } from '@/features/support/faqs-tags/admin/command/delete-faqs-tag/delete-faqs-tag.handler';
import { FaqPublicController } from '@/features/support/faqs/public/faq.public.controller';
import { GetAllFaqPublicHandler } from '@/features/support/faqs/public/query/get-all-faq/get-all-faq.public.handler';
import { GetOneFaqPublicHandler } from '@/features/support/faqs/public/query/get-one-faq/get-one-faq.public.handler';
import { QuestionPublicController } from '@/features/support/questions/public/question.public.controller';
import { GetAllQuestionPublicHandler } from '@/features/support/questions/public/query/get-all-question/get-all-question.public.handler';
import { GetOneQuestionPublicHandler } from '@/features/support/questions/public/query/get-one-question/get-one-question.public.handler';
import { CreateQuestionPublicHandler } from '@/features/support/questions/public/command/create-question/create-question.public.handler';

@Module({
  controllers: [QuestionController, FaqController, FaqsTagsController, FaqPublicController, QuestionPublicController],
  providers: [
    CreateQuestionHandler,
    UpdateQuestionHandler,
    DeleteQuestionHandler,
    GetAllQuestionHandler,
    GetOneQuestionHandler,
    CreateFaqHandler,
    UpdateFaqHandler,
    DeleteFaqHandler,
    GetAllFaqHandler,
    GetOneFaqHandler,
    CreateFaqsTagHandler,
    DeleteFaqsTagHandler,
    GetAllFaqPublicHandler,
    GetOneFaqPublicHandler,
    GetAllQuestionPublicHandler,
    GetOneQuestionPublicHandler,
    CreateQuestionPublicHandler,
  ],
})
export class SupportModule {}
