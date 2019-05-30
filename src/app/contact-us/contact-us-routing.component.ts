import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  ContactUsComponent
} from './contact-us.component';

const contactUsRoutes: Routes = [{
  path: '',
  component: ContactUsComponent
}];

export const contactUsRouting: ModuleWithProviders = RouterModule.forChild(contactUsRoutes);
