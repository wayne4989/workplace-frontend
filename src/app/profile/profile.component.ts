import {
  Component
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  CryptoUtilities
} from '../shared/utilities';
import {
  UserModel
} from '../shared/models';
import {
  UserService
} from '../../services';
import {
  UserApiService
} from '../../services/api';

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private userApiService: UserApiService
  ) {
    this.getUser();
    this.getUserFollowers();
    this.getUserFollowees();
  }

  protected followers: Array<UserModel> = [];
  protected followees: Array<UserModel> = [];

  protected mobileLinkSelected: string = 'timeline';
  protected userId: number;
  private user: UserModel = UserService.getOtherUser() || UserService.getUser();

  public onClickSelectMobileLink (type): void {
    this.mobileLinkSelected = type;
  }

  private getUser (): void {
    if (UserService.getOtherUser()) {
      this.user = UserService.getOtherUser();
    } else {
      this.user = UserService.getUser();
    }
  }

  private getUserFollowers (): void {
    this.userApiService.promiseGetFollowers(this.user.id)
      .then((followers: UserModel[]) => {
        this.followers = followers;
      })
      .catch(() => {});
  }

  private getUserFollowees (): void {
    this.userApiService.promiseGetFollowees(this.user.id)
      .then((followees: UserModel[]) => {
        this.followees = followees;
      })
      .catch(() => {});
  }
}
