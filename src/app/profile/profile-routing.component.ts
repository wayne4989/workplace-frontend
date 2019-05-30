import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  ProfileComponent
} from './profile.component';
import {
  CanActivateOtherProfile
} from './check-if-other-profile';

const profileRoutes: Routes = [{
  path: '',
  component: ProfileComponent, // profile of currently login user,
  canActivate: [CanActivateOtherProfile]
}, {
  path: ':id',
  component: ProfileComponent,
  canActivate: [CanActivateOtherProfile]
}];

export const profileRouting: ModuleWithProviders = RouterModule.forChild(profileRoutes);
