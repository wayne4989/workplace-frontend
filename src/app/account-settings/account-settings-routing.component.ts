import {
  ModuleWithProviders
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
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

const accountSettingsRoutes: Routes = [{
  path: '',
  component: AccountSettingsComponent,
  children: [{
    path: 'general',
    component: AccountSettingsGeneralComponent
  }, {
    path: 'password',
    component: AccountSettingsPasswordComponent
  }, {
    path: 'security-privacy',
    component: AccountSettingsSecurityPrivacyComponent
  }, {
    path: 'blocking',
    component: AccountSettingsBlockingComponent
  }, {
    path: 'notifications',
    component: AccountSettingsNotificationsComponent
  }, {
    path: 'billing',
    component: AccountSettingsBillingComponent
  }]
}];

export const accountSettingsRouting: ModuleWithProviders = RouterModule.forChild(accountSettingsRoutes);
