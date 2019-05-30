import {
  BrowserModule,
  Title
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';
import {
  AppComponent
} from './app.component';
import {
  AppRoutingModule
} from './app-routing.module';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  SharedDirectiveModule
} from './shared/directives/shared-directive.module';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
  MatDialogModule,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule
} from '@angular/material';
import {
  NgxSpinnerModule
} from 'ngx-spinner';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import {
  CampusApiService,
  CourseApiService,
  InterestApiService,
  PostApiService,
  UserApiService,
  AdvanceSearchService,
  MessagesApiService,
  CommunityApiService,
  NotificationApiService
} from '../services/api';
import {
  UtilitiesService,
  TitleService,
  MetaService
} from '../services';
import {
  AuthInterceptor
} from '../interceptors/authinterceptor';
import {
  RouterModule
} from '@angular/router';
import 'tinymce';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

import {
  SharedSharePostModalComponent,
  SharedViewPostModalComponent,
  ReportPostModalComponent,
  SharedConfirmModalComponent,
  SharedImagePreviewComponent,
  SharedCreateMessageComponent,
  SharedPostDetailModalComponent,
  BecomeMentorModalComponent,
  SharedPostLikeDetailModalComponent,
  MentorModalComponent,
  CreateCommunityComponent,
  ComunityMobileAskQuestionMobileComponent,
  ReportPostCommunityModalComponent,
  SharedCommunityPostReplyComponent,
  SharedPostReplyCommentModalComponent
} from './shared/modals';
import {
  SharedModule
} from './shared/components/shared.module';
import {
  CanActivateUserProfile,
  RedirectToOnboardingComponent,
  RedirectToHomeComponent,
  RedirectToIndexComponent
} from './shared/can-activate';

declare var tinymce: any;
tinymce.init({});

@NgModule({
  imports: [
    BrowserModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    SharedDirectiveModule,
    NgxSpinnerModule,
    NgxLinkifyjsModule.forRoot({
      enableHash: false,
      enableMention: false
    })
  ],
  providers: [{
    provide: MAT_DIALOG_DATA,
    useValue: []
  }, {
    provide: DateAdapter,
    useClass: NativeDateAdapter
  }, {
    provide: MAT_DATE_FORMATS,
    useValue: MY_DATE_FORMATS
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
    CanActivateUserProfile,
    RedirectToOnboardingComponent,
    RedirectToHomeComponent,
    RedirectToIndexComponent,
    CampusApiService,
    CourseApiService,
    InterestApiService,
    PostApiService,
    UserApiService,
    MessagesApiService,
    NotificationApiService,
    UtilitiesService,
    TitleService,
    MetaService,
    Title,
    AdvanceSearchService,
    UtilitiesService,
    CommunityApiService
  ],
  declarations: [
    AppComponent,
    SharedPostDetailModalComponent,
    BecomeMentorModalComponent,
    // ProfileLeftSidebarUserInfoMessageDiaglogComponent
    SharedViewPostModalComponent,
    ReportPostModalComponent,
    SharedSharePostModalComponent,
    SharedConfirmModalComponent,
    SharedCreateMessageComponent,
    SharedImagePreviewComponent,
    SharedPostLikeDetailModalComponent,
    MentorModalComponent,
    CreateCommunityComponent,
    ComunityMobileAskQuestionMobileComponent,
    ReportPostCommunityModalComponent,
    SharedCommunityPostReplyComponent,
    SharedPostReplyCommentModalComponent
  ],
  exports: [],
  entryComponents: [
    SharedSharePostModalComponent,
    SharedPostDetailModalComponent,
    BecomeMentorModalComponent,
    SharedViewPostModalComponent,
    ReportPostModalComponent,
    SharedConfirmModalComponent,
    SharedImagePreviewComponent,
    SharedCreateMessageComponent,
    SharedPostLikeDetailModalComponent,
    MentorModalComponent,
    CreateCommunityComponent,
    ComunityMobileAskQuestionMobileComponent,
    ReportPostCommunityModalComponent,
    SharedCommunityPostReplyComponent,
    SharedPostReplyCommentModalComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor (
    private titleService: TitleService,
    private metaService: MetaService
  ) {
    this.titleService.init();
    this.metaService.init();
  }
}
