import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UserApiService
} from '../../../../services/api';
import {
  UserModel
} from '../../../shared/models';
import {
  CryptoUtilities
} from '../../../shared/utilities';
import {
  UserService,
} from '../../../../services';

@Component({
  selector: 'shared-followers-component',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class SharedFollowersComponent {
  constructor (
    private userApiService: UserApiService,
    private router: Router
  ) {}

  protected followers: Array<UserModel> = [];
  private user: UserModel = UserService.getOtherUser() || UserService.getUser();

  public ngOnInit (): void {
    this.getUserFollowers();
  }

  private getUserFollowers (): void {
    this.userApiService.promiseGetFollowers(this.user.id)
      .then((followers: UserModel[]) => {
        this.followers = followers;
        console.log('followers', this.followers);

      })
      .catch(() => {});
  }

  protected onClickUserProfile (user): Promise<boolean> {
    let userId = CryptoUtilities.cipher(user.id);
    let currentLoginUser = UserService.getUser();

    if (user.id === currentLoginUser.id) {
      return this.router.navigate([`/profile`]);
    }

    return this.router.navigate([`/profile/${userId}`]);
  }
}
