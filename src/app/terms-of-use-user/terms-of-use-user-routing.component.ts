import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  TermsOfUseUserComponent
} from './terms-of-use-user.component';

const termsOfUseUserRoutes: Routes = [{
  path: '',
  component: TermsOfUseUserComponent
}];

export const termsOfUseUserRouting: ModuleWithProviders = RouterModule.forChild(termsOfUseUserRoutes);
