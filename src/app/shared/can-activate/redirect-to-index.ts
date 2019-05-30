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
export class RedirectToIndexComponent implements Resolve<boolean> {
  constructor (
    private router: Router
  ) {}

  public resolve (): Promise<boolean> {
    const user: UserModel = UserService.getUser();

    return new Promise((resolve) => {
      if (!user) {
        this.router.navigate(['']);
      }

      resolve(true);
    });
  }
}
