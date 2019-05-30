import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  AboutUsComponent
} from './about-us.component';

const aboutUsRoutes: Routes = [{
  path: '',
  component: AboutUsComponent
}];

export const aboutUsRouting: ModuleWithProviders = RouterModule.forChild(aboutUsRoutes);
