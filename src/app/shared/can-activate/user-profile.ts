import {
  Injectable
} from '@angular/core';
import {
  CanActivate
} from '@angular/router';
import {
  UserApiService,
} from '../../../services/api';
import {
  TokenStore,
  UserService
} from '../../../services';
import {
  UserModel
} from '../models';

@Injectable()
export class CanActivateUserProfile implements CanActivate {
  constructor (
    private userApiService: UserApiService
  ) {}

  public canActivate (/*route: ActivatedRouteSnapshot, state: RouterStateSnapshot*/): Promise<boolean> {
    return new Promise((resolve) => {
      const token = TokenStore.getAccessToken();

      if ((token && UserService.getUser()) || !token) {
        return resolve(true);
      }

      this.userApiService.promiseGetUser()
        .then((userData: UserModel) => {
          TokenStore.setAccessToken(userData.token);
          UserService.setUser(userData);

          resolve(true);
        })
        .catch(() => {
          TokenStore.expungeData();
          window.location.reload();
          resolve(false);
        });
    });
  }
}
