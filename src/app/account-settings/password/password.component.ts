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
  selector: 'account-settings-password-component',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class AccountSettingsPasswordComponent {
  constructor (
    private userApiService: UserApiService
  ) {}

  protected user: UserModel = new UserModel();

  public ngOnInit (): void {}

  protected onPasswordUpdate (isValid): void {
    if (isValid) {
      this.userApiService.promiseUpdatePassword(this.user)
      .then(() => {})
      .catch(error => {});
    }
  }
}
