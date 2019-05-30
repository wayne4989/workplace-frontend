import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CampusAdminLandingPageComponent
} from './landing-page/landing-page.component';
import {
  CampusAdminComponent
} from './campus-admin.component';
import {
  CampusAdminMainComponent
} from './main/main.component';
import {
  CampusAdminDashBoard
} from './main/dashboard/dashboard.component';

// Group Management Components
import {
  CampusAdminRegistryComponent
} from './main/registry/registry.component';
import {
  CampusAdminSuspendUserComponent
} from './main/suspend-user/suspend-user.component';
import {
  CampusAdminPostAnnouncementComponent
} from './main/post-announcement/post-announcement.component';
import {
  CampusAdminCoursesAndClassesComponent
} from './main/courses-and-classes/courses-and-classes.component';

// import {
//   CanActivateOtherProfile
// } from './check-if-other-profile';

const campusAdminRoutes: Routes = [{
  path: '',
  component: CampusAdminComponent,
  children: [{
    path: '',
    component: CampusAdminLandingPageComponent
  }, {
    path: ':id',
    component: CampusAdminMainComponent,
    children: [{
      path: 'dashboard',
      component: CampusAdminDashBoard,
    }, {
      path: 'registry',
      component: CampusAdminRegistryComponent
    }, {
      path: 'suspend-user',
      component: CampusAdminSuspendUserComponent
    }, {
      path: 'post-announcement',
      component: CampusAdminPostAnnouncementComponent
     }, {
      path: 'courses-and-classes',
      component: CampusAdminCoursesAndClassesComponent
     }]
  }]
}];
export const campusAdminRouting: ModuleWithProviders = RouterModule.forChild(campusAdminRoutes);
