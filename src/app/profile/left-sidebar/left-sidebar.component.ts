import {
  Component,
  Input
} from '@angular/core';
import {
  UserModel
} from '../../shared/models';
import {
  UserService
} from '../../../services';

@Component({
  selector: 'profile-left-sidebar-component',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class ProfileLeftSidebarComponent {
  constructor () {}

  @Input() protected user: UserModel;
  protected isUserProfile: boolean = true;

  public ngOnInit (): void {
    let currentLoginUser = UserService.getUser();

    if (currentLoginUser.id !== this.user.id) {
      this.isUserProfile = false;
    } else {
      this.isUserProfile = true;
    }
  }
}
