import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CanActivateUserProfile,
  RedirectToOnboardingComponent,
  RedirectToHomeComponent,
  RedirectToIndexComponent
} from './shared/can-activate';

export const appRoutes: Routes = [{
  path: 'peers',
  loadChildren: './peers/peers.module#PeersModule',
  data: { state: 'peers' }
}, {
  path: 'campus',
  loadChildren: './campus/campus.module#CampusModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [CanActivateUserProfile],
  data: {state: 'campus'}
}, {
  path: 'community',
  loadChildren: './community/community.module#CommunityModule',
  resolve: [RedirectToOnboardingComponent],
  canActivate: [CanActivateUserProfile],
  data: {state: 'community'}
}, {
  path: 'user',
  loadChildren: './user/user.module#UserModule',
  canActivate: [CanActivateUserProfile],
  data: {state: 'user'}
}, {
  path: 'profile',
  loadChildren: './profile/profile.module#ProfileModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [CanActivateUserProfile],
  data: {state: 'profile'}
}, {
  path: 'home',
  loadChildren: './home/home.module#HomeModule',
  resolve: [RedirectToOnboardingComponent, RedirectToIndexComponent],
  canActivate: [CanActivateUserProfile],
  data: {
    state: 'home'
  }
}, {
  path: 'leisure',
  loadChildren: './leisure/leisure.module#LeisureModule',
  data: {state: 'leisure'}
}, {
  path: '',
  loadChildren: './index/index.module#IndexModule',
  resolve: [RedirectToOnboardingComponent, RedirectToHomeComponent],
  canActivate: [CanActivateUserProfile],
  data: {
    title: 'The Social Network for Students'
  }
}, {
  path: 'sign-up',
  loadChildren: './sign-up/sign-up.module#SignUpModule',
  resolve: [RedirectToHomeComponent],
  canActivate: [CanActivateUserProfile],
  data: {
    state: 'sign-up',
    title: 'Sign up',
    meta: [{
      name: 'description', content: 'Sign in to your Peersview Account'
    }]
  }
}, {
  path: 'sign-in',
  loadChildren: './sign-in/sign-in.module#SignInModule',
  resolve: [RedirectToHomeComponent],
  canActivate: [CanActivateUserProfile],
  data: {
    state: 'sign-in',
    title: 'Sign in',
    meta: [{
      name: 'description', content: 'Sign up to Peersview and start connecting with your peers'
    }]
  }
}, {
  path: 'about-us',
  loadChildren: './about-us/about-us.module#AboutUsModule',
  data: {
    state: 'about-us',
    title: 'About Peersview',
    meta: [{
      name: 'description', content: 'We aim to empower university students by connecting them with peers'
    }]
  }
}, {
  path: 'contact-us',
  loadChildren: './contact-us/contact-us.module#ContactUsModule',
  data: {
    state: 'contact-us',
    title: 'Contact Us',
    meta: [{
      name: 'description', content: 'Have any questions? Let us know how we can help!'
    }]
  }
}, {
  path: 'digital-campus',
  loadChildren: './digital-campus/digital-campus.module#DigitalCampusModule',
  data: {
    state: 'digital-campus',
    title: 'Peersview Digital Campus',
    meta: [{
      name: 'description', content: 'Connect your university\'s community with Peersview'
    }]
  }
}, {
  path: 'advance-search',
  loadChildren: './advance-search/advance-search.module#AdvanceSearchModule',
  data: {state: 'advance-search'}
}, {
  path: 'account-settings',
  loadChildren: './account-settings/account-settings.module#AccountSettingsModule',
  data: {state: 'account-settings'}
}, {
  path: 'terms-of-use-user',
  loadChildren: './terms-of-use-user/terms-of-use-user.module#TermsOfUseUserModule',
  data: {
    state: 'terms-of-use-user',
    title: 'Terms for using our Digital campus',
    meta: [{
      name: 'description', content: 'By using our products and services, you are agreeing to our terms and condition'
    }]
  }
}, {
  path: 'privacy-policy',
  loadChildren: './privacy-policy/privacy-policy.module#PrivacyPolicyModule',
  data: {
    state: 'privacy-policy',
    title: 'Privacy policy',
    meta: [{
      name: 'description',
      content: 'The Peersview Privacy Policy for Applicants gives you an overview of how we collect and process your information'
    }]
  }
}, {
  path: 'notification',
  loadChildren: './notification/notification.module#NotificationModule',
  canActivate: [CanActivateUserProfile],
  data: {state: 'notification'}
}, {
  path: 'campus-admin',
  loadChildren: './campus-admin/campus-admin.module#CampusAdminModule',
  canActivate: [CanActivateUserProfile],
  data: {state: 'campus-admin'}
}, {
  path: 'terms-of-use',
  loadChildren: './terms-of-use/terms-of-use.module#TermsOfUseModule',
  data: {
    state: 'terms-of-use',
    title: 'Terms of Use',
    meta: [{
      name: 'description', content: 'By using our products and services, you are agreeing to our terms and condition'
    }]
  }
}, {
  path: 'messages',
  loadChildren: './messages/messages.module#MessagesModule',
  canActivate: [CanActivateUserProfile],
  data: {state: 'messages'}
}];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
