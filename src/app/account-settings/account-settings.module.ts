/* angular components */
import {
  NgModule
} from '@angular/core';
/*third party*/
import {
  AccountSettingsComponent
} from './account-settings.component';
import {
  AccountSettingsGeneralComponent
} from './general/general.component';
import {
  AccountSettingsPasswordComponent
} from './password/password.component';
import {
  AccountSettingsSecurityPrivacyComponent
} from './security-privacy/security-privacy.component';
import {
  AccountSettingsBlockingComponent
} from './blocking/blocking.component';
import {
  AccountSettingsNotificationsComponent
} from './notifications/notifications.component';
import {
  AccountSettingsBillingComponent
} from './billing/billing.component';
import {
  SharedModule
} from '../shared/components/shared.module';
import {
  SharedPipeModule
} from '../shared/pipe/pipe.module';
import {
  accountSettingsRouting
} from './account-settings-routing.component';

@NgModule({
  imports : [
    SharedModule,
    SharedPipeModule,
    accountSettingsRouting
  ],
  declarations : [
    AccountSettingsComponent,
    AccountSettingsGeneralComponent,
    AccountSettingsPasswordComponent,
    AccountSettingsSecurityPrivacyComponent,
    AccountSettingsBlockingComponent,
    AccountSettingsNotificationsComponent,
    AccountSettingsBillingComponent
  ],
  exports: []
})
export class AccountSettingsModule {}
