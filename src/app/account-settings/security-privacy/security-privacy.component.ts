import {
  Component
} from '@angular/core';
import {
  UserModel
} from '../../shared/models';
import {
  UserApiService
} from '../../../services/api';

@Component({
  selector: 'account-settings-security-privacy-component',
  templateUrl: './security-privacy.component.html',
  styleUrls: ['./security-privacy.component.scss']
})
export class AccountSettingsSecurityPrivacyComponent {
  constructor (
    private userApiService: UserApiService
  ) {}

  public ngOnInit (): void {}

  protected onUpdateSecurity (): void {}
}
