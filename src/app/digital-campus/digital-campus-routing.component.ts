import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  DigitalCampusComponent
} from './digital-campus.component';

const digitalCampusRoutes: Routes = [{
  path: '',
  component: DigitalCampusComponent
}];

export const digitalCampusRouting: ModuleWithProviders = RouterModule.forChild(digitalCampusRoutes);
