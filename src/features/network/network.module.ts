import { Module } from '@nestjs/common';
import { RepresentativeController } from '@/features/network/representative/admin/representative.admin.controller';
import { CreateRepresentativeHandler } from '@/features/network/representative/admin/command/create-representative/create-representative.handler';
import { UpdateRepresentativeHandler } from '@/features/network/representative/admin/command/update-representative/update-representative.handler';
import { DeleteRepresentativeHandler } from '@/features/network/representative/admin/command/delete-representative/delete-representative.handler';
import { GetAllRepresentativeHandler } from '@/features/network/representative/admin/query/get-all-representative/get-all-representative.handler';
import { GetOneRepresentativeHandler } from '@/features/network/representative/admin/query/get-one-representative/get-one-representative.handler';
import { BranchController } from '@/features/network/branches/admin/branches.admin.controller';
import { CreateBranchHandler } from '@/features/network/branches/admin/command/create-branch/create-branch.handler';
import { UpdateBranchHandler } from '@/features/network/branches/admin/command/update-branch/update-branch.handler';
import { DeleteBranchHandler } from '@/features/network/branches/admin/command/delete-branch/delete-branch.handler';
import { GetAllBranchHandler } from '@/features/network/branches/admin/query/get-all-branch/get-all-branch.handler';
import { GetOneBranchHandler } from '@/features/network/branches/admin/query/get-one-branch/get-one-branch.handler';
import { InstagramPostController } from '@/features/network/instagram-posts/admin/instagram-posts.admin.controller';
import { CreateInstagramPostHandler } from '@/features/network/instagram-posts/admin/command/create-instagram-post/create-instagram-post.handler';
import { UpdateInstagramPostHandler } from '@/features/network/instagram-posts/admin/command/update-instagram-post/update-instagram-post.handler';
import { DeleteInstagramPostHandler } from '@/features/network/instagram-posts/admin/command/delete-instagram-post/delete-instagram-post.handler';
import { GetAllInstagramPostHandler } from '@/features/network/instagram-posts/admin/query/get-all-instagram-post/get-all-instagram-post.handler';
import { GetOneInstagramPostHandler } from '@/features/network/instagram-posts/admin/query/get-one-instagram-post/get-one-instagram-post.handler';
import { RepresentativePublicController } from '@/features/network/representative/public/representative.public.controller';
import { GetAllRepresentativePublicHandler } from '@/features/network/representative/public/query/get-all-representative/get-all-representative.public.handler';
import { GetOneRepresentativePublicHandler } from '@/features/network/representative/public/query/get-one-representative/get-one-representative.public.handler';
import { GetOneBranchPublicHandler } from '@/features/network/branches/public/query/get-one-branch/get-one-branch.public.handler';
import { GetOneInstagramPostPublicHandler } from '@/features/network/instagram-posts/public/query/get-one-instagram-post/get-one-instagram-post.public.handler';
import { BranchesPublicController } from '@/features/network/branches/public/branches.public.controller';
import { InstagramPostsPublicController } from '@/features/network/instagram-posts/public/instagram-posts.public.controller';
import { GetAllBranchesPublicHandler } from '@/features/network/branches/public/query/get-all-branches/get-all-branches.public.handler';
import { GetAllInstagramPostsPublicHandler } from '@/features/network/instagram-posts/public/query/get-all-instagram-posts/get-all-instagram-posts.public.handler';

@Module({
  controllers: [
    RepresentativeController,
    BranchController,
    InstagramPostController,
    RepresentativePublicController,
    BranchesPublicController,
    InstagramPostsPublicController,
  ],
  providers: [
    CreateRepresentativeHandler,
    UpdateRepresentativeHandler,
    DeleteRepresentativeHandler,
    GetAllRepresentativeHandler,
    GetOneRepresentativeHandler,
    CreateBranchHandler,
    UpdateBranchHandler,
    DeleteBranchHandler,
    GetAllBranchHandler,
    GetOneBranchHandler,
    CreateInstagramPostHandler,
    UpdateInstagramPostHandler,
    DeleteInstagramPostHandler,
    GetAllInstagramPostHandler,
    GetOneInstagramPostHandler,
    GetAllRepresentativePublicHandler,
    GetOneRepresentativePublicHandler,
    GetAllBranchesPublicHandler,
    GetOneBranchPublicHandler,
    GetAllInstagramPostsPublicHandler,
    GetOneInstagramPostPublicHandler,
  ],
})
export class NetworkModule {}
