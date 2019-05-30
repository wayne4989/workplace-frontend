/* angular components */
import {
  NgModule,
} from '@angular/core';
import {
  CommonModule/*use for *ngIf*/
} from '@angular/common';
import {
  RouterModule
} from '@angular/router';
import {
  FormsModule
} from '@angular/forms';
import {
  MatDatepickerModule,
  MatProgressBarModule,
  MatInputModule,
  MatBadgeModule
} from '@angular/material';
// import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';
/*third party*/
import {
  CloudinaryModule,
  CloudinaryConfiguration
} from '@cloudinary/angular-5.x';
import {
  Cloudinary
} from 'cloudinary-core';
import {
  FileUploadModule
} from 'ng2-file-upload';
import {
  SharedSidebarFooterComponent
} from './sidebar-footer/sidebar-footer.component';
import {
  SharedNavBarComponent
} from './navbar/navbar.component';
import {
  SharedNavbarUnauthComponent
} from './navbar-unauth/navbar-unauth.component';
import {
  NavbarMobileComponent
} from './navbar/mobile/mobile.component';
import {
  NavbarDesktopComponent
} from './navbar/desktop/desktop.component';
import {
  SharedPostOptionsComponent
} from './post-options/post-options.component';
import {
  SharedStarsComponent
} from './stars/stars.component';
import {
  SharedUserRatingComponent
} from './user-rating/user-rating.component';
import {
  SharedPeersYouMayKnowComponent
} from './peers-you-may-know/peers-you-may-know.component';
import {
  SharedPostTextareaComponent
} from './post-textarea/post-textarea.component';
import {
  SharedFolloweeComponent
} from './followee/followee.component';
import {
  SharedSocialComponent
} from './social/social.component';
import {
  SharedFollowersComponent
} from './followers/followers.component';
import {
  SharedPostComponent
} from './post/post.component';
import {
  SharedUploadImageComponent
} from './upload-image/upload-image.component';
import {
  SharedReportPostComponent
} from './report-post/report.post.component';
import {
  SharedPostReplyComponent
} from './post-reply/post-reply.component';
import {
  IndexFooterComponent
} from './footer/footer.component';
import {
  SharedAnnouncementComponent
} from './announcement/announcement.component';
import {
  SharedNotificationListComponent
} from './notifcation-list/notification-list.component';
import {
  SharedConverstionListComponent
} from './conversation-list/conversation-list.component';
import {
  TimeAgoPipe
} from 'time-ago-pipe';
/*providers*/
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import {
  SharedReportPostCommunityComponent
} from './report-post-community/report.post.community.component';
import {
  SharedCommunityPostReplyComponent
} from './community-post-reply/community-post-reply.component';
import {
  SharedPostReplyCommentComponent
} from './post-reply-comment/post-reply-comment.component';
import {
  SharedReportPostReplyComponent
} from './report-post-reply/report-post-reply.component';

let config = new AuthServiceConfig([{
  id: GoogleLoginProvider.PROVIDER_ID,
  provider: new GoogleLoginProvider('728624358526-dvsj7v3t4l7i6s9hbulrl7plintkt7ip.apps.googleusercontent.com')
}, {
  id: FacebookLoginProvider.PROVIDER_ID,
  provider: new FacebookLoginProvider('2018255745088769')
}]);

export function provideConfig (): any {
  return config;
}

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'peersview-com' } as CloudinaryConfiguration),
    FileUploadModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatInputModule,
    SocialLoginModule,
    MatBadgeModule
  ],
  declarations: [
    SharedSidebarFooterComponent,
    SharedNavBarComponent,
    SharedNavbarUnauthComponent,
    NavbarMobileComponent,
    NavbarDesktopComponent,
    SharedPostOptionsComponent,
    SharedPostReplyComponent,
    SharedStarsComponent,
    SharedUserRatingComponent,
    SharedPeersYouMayKnowComponent,
    SharedPostTextareaComponent,
    SharedFolloweeComponent,
    SharedSocialComponent,
    SharedFollowersComponent,
    SharedPostComponent,
    SharedUploadImageComponent,
    SharedReportPostComponent,
    SharedAnnouncementComponent,
    SharedNotificationListComponent,
    SharedConverstionListComponent,
    IndexFooterComponent,
    TimeAgoPipe,
    SharedReportPostCommunityComponent,
    SharedCommunityPostReplyComponent,
    SharedPostReplyCommentComponent,
    SharedReportPostReplyComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    CloudinaryModule,
    SharedSidebarFooterComponent,
    SharedNavBarComponent,
    SharedNavbarUnauthComponent,
    NavbarMobileComponent,
    NavbarDesktopComponent,
    SharedPostOptionsComponent,
    SharedPostReplyComponent,
    SharedStarsComponent,
    SharedUserRatingComponent,
    SharedPeersYouMayKnowComponent,
    SharedPostTextareaComponent,
    SharedFolloweeComponent,
    SharedSocialComponent,
    SharedFollowersComponent,
    SharedPostComponent,
    SharedUploadImageComponent,
    SharedReportPostComponent,
    TimeAgoPipe,
    MatProgressBarModule,
    MatDatepickerModule,
    SharedAnnouncementComponent,
    SharedNotificationListComponent,
    SharedConverstionListComponent,
    IndexFooterComponent,
    MatInputModule,
    SharedReportPostCommunityComponent,
    SharedCommunityPostReplyComponent,
    SharedPostReplyCommentComponent,
    SharedReportPostReplyComponent,
    MatBadgeModule
  ],
  providers: [
    {provide: Window, useValue: window},
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class SharedModule {
  constructor () {}
}
