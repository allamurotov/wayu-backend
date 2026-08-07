import { Module } from '@nestjs/common';
import { CountryController } from '@/features/common/countries/admin/country.admin.controller';
import { GetAllCountryHandler } from '@/features/common/countries/admin/query/get-all-country/get-all-country.handler';
import { CreateCountryHandler } from '@/features/common/countries/admin/command/create-country/create-country.handler';
import { GetOneCountryHandler } from '@/features/common/countries/admin/query/get-one-country/get-one-country.handler';
import { DeleteCountryHandler } from '@/features/common/countries/admin/command/delete-country/delete-country.handler';
import { UpdateCountryHandler } from '@/features/common/countries/admin/command/update-country/update-country.handler';
import { CountryPublicController } from '@/features/common/countries/public/country.public.controller';
import { GetAllCountryPublicHandler } from '@/features/common/countries/public/query/get-all-country/get-all-country.public.handler';
import { GetOneCountryPublicHandler } from '@/features/common/countries/public/query/get-one-country/get-one-country.public.handler';
import { LanguageController } from '@/features/common/languages/admin/language.admin.controller';
import { CreateLanguageHandler } from '@/features/common/languages/admin/command/create-language/create-language.handler';
import { GetAllLanguageHandler } from '@/features/common/languages/admin/query/get-all-language/get-all-language.handler';
import { GetOneLanguageHandler } from '@/features/common/languages/admin/query/get-one-language/get-one-language.handler';
import { DeleteLanguageHandler } from '@/features/common/languages/admin/command/delete-language/delete-language.handler';
import { UpdateLanguageHandler } from '@/features/common/languages/admin/command/update-language/update-language.handler';
import { LanguagePublicController } from '@/features/common/languages/public/language.public.controller';
import { GetAllLanguagePublicHandler } from '@/features/common/languages/public/query/get-all-language/get-all-language.public.handler';
import { GetOneLanguagePublicHandler } from '@/features/common/languages/public/query/get-one-language/get-one-language.public.handler';
import { SocialLinkController } from '@/features/common/social-links/admin/socialLink.admin.controller';
import { CreateSocialLinkHandler } from '@/features/common/social-links/admin/command/create-social-link/create-social-link.handler';
import { DeleteSocialLinkHandler } from '@/features/common/social-links/admin/command/delete-social-link/delete-social-link.handler';
import { UpdateSocialLinkHandler } from '@/features/common/social-links/admin/command/update-social-link/update-social-link.handler';
import { GetAllSocialLinkHandler } from '@/features/common/social-links/admin/query/get-all-social-link/get-all-social-link.handler';
import { GetOneSocialLinkHandler } from '@/features/common/social-links/admin/query/get-one-social-link/get-one-social-link.handler';
import { SocialLinkPublicController } from '@/features/common/social-links/public/socialLink.public.controller';
import { GetAllSocialLinkPublicHandler } from '@/features/common/social-links/public/query/get-all-social-link/get-all-social-link.public.handler';
import { GetOneSocialLinkPublicHandler } from '@/features/common/social-links/public/query/get-one-social-link/get-one-social-link.public.handler';
import { UsefulLinkController } from '@/features/common/useful-links/admin/usefulLink.admin.controller';
import { CreateUsefulLinkHandler } from '@/features/common/useful-links/admin/command/create-useful-link/create-useful-link.handler';
import { GetAllUsefulLinkHandler } from '@/features/common/useful-links/admin/query/get-all-useful-link/get-all-useful-link.handler';
import { GetOneUsefulLinkHandler } from '@/features/common/useful-links/admin/query/get-one-useful-link/get-one-useful-link.handler';
import { DeleteUsefulLinkHandler } from '@/features/common/useful-links/admin/command/delete-useful-link/delete-useful-link.handler';
import { UpdateUsefulLinkHandler } from '@/features/common/useful-links/admin/command/update-useful-link/update-useful-link.handler';
import { CreateTagsHandler } from '@/features/common/tags/admin/command/create-tags/create-tags.handler';
import { GetAllTagsHandler } from '@/features/common/tags/admin/query/get-all-tags/get-all-tags.handler';
import { GetOneTagsHandler } from '@/features/common/tags/admin/query/get-one-tags/get-one-tags.handler';
import { DeleteTagsHandler } from '@/features/common/tags/admin/command/delete-tags/delete-tags.handler';
import { UpdateTagsHandler } from '@/features/common/tags/admin/command/update-tags/update-tags.handler';
import { TagsController } from '@/features/common/tags/admin/tags.admin.controller';
import { TagsPublicController } from '@/features/common/tags/public/tags.public.controller';
import { StaticInfoController } from '@/features/common/static-info/admin/static-info.admin.controller';
import { CreateStaticInfoHandler } from '@/features/common/static-info/admin/command/create-static-info/create-static-info.handler';
import { UpdateStaticInfoHandler } from '@/features/common/static-info/admin/command/update-static-info/update-static-info.handler';
import { DeleteStaticInfoHandler } from '@/features/common/static-info/admin/command/delete-static-info/delete-static-info.handler';
import { GetAllStaticInfoHandler } from '@/features/common/static-info/admin/query/get-all-static-info/get-all-static-info.handler';
import { GetOneStaticInfoHandler } from '@/features/common/static-info/admin/query/get-one-static-info/get-one-static-info.handler';
import { StaticInfoPublicController } from '@/features/common/static-info/public/static-info.public.controller';
import { GetAllStaticInfoPublicHandler } from '@/features/common/static-info/public/query/get-all-static-info/get-all-static-info.public.handler';
import { GetOneStaticInfoPublicHandler } from '@/features/common/static-info/public/query/get-one-static-info/get-one-static-info.public.handler';
import { GetAllTagsPublicHandler } from '@/features/common/tags/public/get-all-tags/get-all-tags.public.handler';
import { GetOneTagsPublicHandler } from '@/features/common/tags/public/get-one-tags/get-one-tags.public.handler';
import { GetAllUsefulLinkPublicHandler } from '@/features/common/useful-links/public/query/get-all-useful-link/get-all-useful-link.public.handler';
import { GetOneUsefulLinkPublicHandler } from '@/features/common/useful-links/public/query/get-one-useful-link/get-one-useful-link.public.handler';
import { UsefulLinkPublicController } from '@/features/common/useful-links/public/usefulLink.public.controller';

@Module({
  controllers: [
    CountryController,
    CountryPublicController,
    LanguageController,
    LanguagePublicController,
    SocialLinkController,
    SocialLinkPublicController,
    UsefulLinkController,
    UsefulLinkPublicController,
    TagsController,
    TagsPublicController,
    StaticInfoController,
    StaticInfoPublicController,
  ],
  providers: [
    GetAllCountryHandler,
    CreateCountryHandler,
    GetOneCountryHandler,
    DeleteCountryHandler,
    UpdateCountryHandler,
    GetAllCountryPublicHandler,
    GetOneCountryPublicHandler,
    CreateLanguageHandler,
    GetAllLanguageHandler,
    GetOneLanguageHandler,
    DeleteLanguageHandler,
    UpdateLanguageHandler,
    GetAllLanguagePublicHandler,
    GetOneLanguagePublicHandler,
    CreateSocialLinkHandler,
    DeleteSocialLinkHandler,
    UpdateSocialLinkHandler,
    GetAllSocialLinkHandler,
    GetOneSocialLinkHandler,
    GetAllSocialLinkPublicHandler,
    GetOneSocialLinkPublicHandler,
    CreateUsefulLinkHandler,
    GetAllUsefulLinkHandler,
    GetOneUsefulLinkHandler,
    DeleteUsefulLinkHandler,
    UpdateUsefulLinkHandler,
    GetAllUsefulLinkPublicHandler,
    GetOneUsefulLinkPublicHandler,
    CreateTagsHandler,
    GetAllTagsHandler,
    GetOneTagsHandler,
    DeleteTagsHandler,
    UpdateTagsHandler,
    GetAllTagsPublicHandler,
    GetOneTagsPublicHandler,
    CreateStaticInfoHandler,
    UpdateStaticInfoHandler,
    DeleteStaticInfoHandler,
    GetAllStaticInfoHandler,
    GetOneStaticInfoHandler,
    GetAllStaticInfoPublicHandler,
    GetOneStaticInfoPublicHandler,
  ],
})
export class CommonModule {}
