import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  SignUpComponent
} from './sign-up.component';
import {
  SignUpThankYouComponent
} from './thank-you/thank-you.component';

const signUpRoutes: Routes = [{
  path: '',
  component: SignUpComponent
}, {
  path: 'thank-you-for-signing',
  component: SignUpThankYouComponent
}];

export const signUpRouting: ModuleWithProviders = RouterModule.forChild(signUpRoutes);
