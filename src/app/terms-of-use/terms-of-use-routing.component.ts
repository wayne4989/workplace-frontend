import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  TermsOfUseComponent
} from './terms-of-use.component';

const termsOfUseRoutes: Routes = [{
  path: '',
  component: TermsOfUseComponent
}];
export const termsOfUseRouting: ModuleWithProviders = RouterModule.forChild(termsOfUseRoutes);
