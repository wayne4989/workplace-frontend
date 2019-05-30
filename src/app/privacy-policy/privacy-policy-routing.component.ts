import {
    ModuleWithProviders
} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import {
    PrivacyPolicyComponent
} from './privacy-policy.component';

const privacyPolicyRoutes: Routes = [{
    path: '',
    component: PrivacyPolicyComponent
}];

export const privacyPolicyRouting: ModuleWithProviders = RouterModule.forChild(privacyPolicyRoutes);
