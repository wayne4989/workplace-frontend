/* angular components */
import {
  NgModule
} from '@angular/core';
/*third party*/
import {
  DigitalCampusComponent
} from './digital-campus.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  digitalCampusRouting
} from './digital-campus-routing.component';
import {
  SharedDirectiveModule
} from '../shared/directives/shared-directive.module';
/*components*/
import {
  DigitalCampusFaqComponent
} from './components/faq/faq.component';
import {
  DigitalCampusInstititutionsComponent
} from './components/institutions/institutions.component';
import {
  DigitalCampusStudentsComponent
} from './components/students/students.component';
import {
  DigitalCampusInstructorsComponent
} from './components/instructors/instructors.component';
import {
  DigitalCampusNetworkAdministratorsComponent
} from './components/network-administrators/network-administrators.component';

@NgModule({
  imports : [
    SharedModule,
    SharedDirectiveModule,
    digitalCampusRouting
  ],
  declarations : [
    DigitalCampusComponent,
    DigitalCampusFaqComponent,
    DigitalCampusInstititutionsComponent,
    DigitalCampusStudentsComponent,
    DigitalCampusInstructorsComponent,
    DigitalCampusNetworkAdministratorsComponent
  ],
  exports: []
})
export class DigitalCampusModule {}
