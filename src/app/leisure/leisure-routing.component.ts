import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  LeisureComponent
} from './leisure.component';

const leisureRoutes: Routes = [{
  path: '',
  component: LeisureComponent
}];

export const leisureRouting: ModuleWithProviders = RouterModule.forChild(leisureRoutes);
