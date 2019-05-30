import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  IndexComponent
} from './index.component';

const indexRoutes: Routes = [{
  path: '',
  component: IndexComponent
}];

export const indexRouting: ModuleWithProviders = RouterModule.forChild(indexRoutes);
