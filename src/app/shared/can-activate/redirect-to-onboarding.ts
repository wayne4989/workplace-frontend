import {
  Injectable
} from '@angular/core';
import {
  Resolve,
  Router
} from '@angular/router';
import {
  UserService
} from '../../../services';
import {
  UserModel
} from '../models';

@Injectable()
export class RedirectToOnboardingComponent implements Resolve<boolean> {
  constructor (
    private router: Router
  ) {}

  private user: UserModel = UserService.getUser();

  public resolve (): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.user && !this.user.userTypeId) {
        this.router.navigate(['/user/on-boarding/status']);
      }

      resolve(true);
    });
  }
}
