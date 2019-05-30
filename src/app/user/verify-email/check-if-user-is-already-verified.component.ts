import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {
  UserApiService
} from '../../../services/api';
import {
  UserModel
} from '../../shared/models';

@Injectable()
export class CheckIfUserIsAlreadyVerifiedComponent implements CanActivate {
  constructor (
    private router: Router,
    private userApiService: UserApiService
  ) {}

  public canActivate (route: ActivatedRouteSnapshot, /*state: RouterStateSnapshot*/): Promise<boolean> {
    return new Promise((resolve) => {
      this.userApiService.promiseGetUserByJotToken(route.queryParams.jotToken, route.queryParams.token)
        .then((user: UserModel) => {
          if (user && user.userTypeId && user.token) {
            this.router.navigate(['/home']);
          }

          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }
}
