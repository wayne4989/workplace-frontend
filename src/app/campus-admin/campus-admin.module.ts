/* angular components */
import {
  NgModule
} from '@angular/core';
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
  CampusAdminLeftSidebarComponent
} from './components/left-sidebar/left-sidebar.component';
import {
  CampusAdminContentsComponent
} from './components/contents/contents.component';
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

import {
  SharedModule
} from '../shared/components/shared.module';
import {
  campusAdminRouting
} from './campus-admin-routing.component';

// Charts
import {
  RegistryStudentsChart
} from './main/registry/charts/student/students.chart';
import {
  RegistryAcademicsChart
} from './main/registry/charts/academics/academics.chart';

@NgModule({
  imports : [
    SharedModule,
    campusAdminRouting
  ],
  declarations : [
    CampusAdminLandingPageComponent,
    CampusAdminComponent,
    CampusAdminMainComponent,
    CampusAdminLeftSidebarComponent,
    CampusAdminContentsComponent,
    CampusAdminDashBoard,
    CampusAdminRegistryComponent,
    CampusAdminSuspendUserComponent,
    CampusAdminPostAnnouncementComponent,
    CampusAdminCoursesAndClassesComponent,
    RegistryStudentsChart,
    RegistryAcademicsChart
  ],
  exports: [
  ],
  entryComponents: [
  ],
  providers: [
  ]
})
export class CampusAdminModule {}
