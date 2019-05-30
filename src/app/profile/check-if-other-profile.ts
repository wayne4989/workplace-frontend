import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {
  UserApiService,
} from '../../services/api';
import {
  TokenStore,
  UserService
} from '../../services';
import {
  UserModel
} from '../shared/models';
import {
  CryptoUtilities
} from '../shared/utilities';

@Injectable()
export class CanActivateOtherProfile implements CanActivate {
  constructor (
    private userApiService: UserApiService
  ) {}

  public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!route.params.id) {
        UserService.setOtherUser(undefined);
        resolve(true);
      }

      let userId = parseInt(CryptoUtilities.decipher(route.params.id), 10);

      return this.userApiService.promiseGetUser(userId)
        .then((user: UserModel) => {
          UserService.setOtherUser(user);

          resolve(true);
        })
        .catch(error => {
          TokenStore.expungeData();
          window.location.reload();
        });
    });
  }
}
