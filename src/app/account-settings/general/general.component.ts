import {
  Component
} from '@angular/core';
import {
  UserModel
} from '../../shared/models';
import {
  UserApiService
} from '../../../services/api';
import {
  UtilitiesService,
} from '../../../services';

@Component({
  selector: 'account-settings-general-component',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class AccountSettingsGeneralComponent {
  constructor (
    private utilitiesService: UtilitiesService,
    private userApiService: UserApiService
  ) {}

  private name: {status: string, key: string, firstName?: string, lastName?: string} = {status: 'Edit', key: 'name'};
  private email: {status: string, key: string, value?: string} = {status: 'Edit', key: 'email'};
  private languages: {status: string, key: string, value?: string} = {status: 'Edit', key: 'language'};
  private dateOfBirth: {status: string} = {status: 'Edit'};
  private languagesData = this.utilitiesService.getlanguages();

  public ngOnInit (): void {}

  protected onEditOrSave (item): void {
    if (item.status === 'Edit') {
      item.status = 'Save';
    } else {
      // request here to save the data
      console.log(item.key);
      switch (item.key) {
        case 'name':
          // this.updateUserName(item);
          break;
        case 'email':
          // this.updateUserEmail(item);
          break;
        case 'language':
          // this.updateUserLanguage(item);
          break;
      }

      item.status = 'Edit';
    }
  }

  protected onChangeLanguage (value): void {
    this.languages.value = value;
  }

  // private updateUserName (name): void {
  //   let nameTemp = Object.assign({}, name);
  //
  //   this.userService.updateName(name)
  //   .subscribe((response: Response) => {
  //     this.user.firstName = nameTemp.firstName;
  //     this.user.lastName = nameTemp.lastName;
  //   });
  // }
  //
  // private updateUserEmail (email): void {
  //   let emailTemp = Object.assign({}, email);
  //
  //   this.userService.updateEmail(email.value)
  //   .subscribe((response: Response) => {
  //     this.user.email = emailTemp.value;
  //   });
  // }
  //
  //
  // private updateUserLanguage (language): void {
  //   let languageTemp = Object.assign({}, language);
  //
  //   this.userService.updateLanguage(language.value)
  //   .subscribe((response: Response) => {
  //     this.user.language = languageTemp.value;
  //   });
  // }
}
