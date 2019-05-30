import {
  NgModule
} from '@angular/core';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  SharedPipeModule
} from '../shared/pipe/pipe.module';
import {
  userRouting
} from './user-routing.component';
import {
  UserComponent
} from './user.component';
import {
  UserVerifyEmailComponent
} from './verify-email/verify-email.component';
import {
  UserOnboardingComponent
} from './on-boarding/on-boarding.component';
import {
  UserOnboardingSelectStatusComponent
} from './on-boarding/select-status/select-status.component';
import {
  UserOnboardingStudentComponent
} from './on-boarding/student/student.component';
import {
  UserOnboardingStudentInterestComponent
} from './on-boarding/student/interest/interest.component';
import {
  UserOnboardingProfessionalComponent
} from './on-boarding/professional/professional.component';
import {
  UserOnboardingOrganisationComponent
} from './on-boarding/organisation/organisation.component';
import {
  CheckIfUserIsAlreadyVerifiedComponent
} from './verify-email/check-if-user-is-already-verified.component';

@NgModule({
  imports: [
    SharedModule,
    SharedPipeModule,
    userRouting
  ],
  declarations: [
    UserComponent,
    UserVerifyEmailComponent,
    UserOnboardingComponent,
    UserOnboardingSelectStatusComponent,
    UserOnboardingStudentComponent,
    UserOnboardingStudentInterestComponent,
    UserOnboardingProfessionalComponent,
    UserOnboardingOrganisationComponent
  ],
  providers: [
    CheckIfUserIsAlreadyVerifiedComponent
  ],
  exports: []
})
export class UserModule {}
