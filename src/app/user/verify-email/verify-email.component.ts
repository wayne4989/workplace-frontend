import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  timer
} from 'rxjs';
import {
  UserApiService
} from '../../../services/api';
import {
  UserModel
} from '../../shared/models';
import {
  TokenStore
} from '../../../services';

@Component({
  selector: 'user-verify-email-component',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class UserVerifyEmailComponent implements OnInit {
  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private userApiService: UserApiService
  ) {}

  private user: UserModel = new UserModel();

  public ngOnInit (): void {

    this.route.queryParams.subscribe((queryParams: {jotToken: string, token: string}) => {
      this.user.assimilate({
        token: queryParams.token
      });

      this.userApiService.promiseVerifyEmail(queryParams.jotToken, this.user)
        .then((user: UserModel) => {
          TokenStore.setAccessToken(user.token);
          timer(3000)
          .subscribe(() => {
            this.router.navigate(['/user/on-boarding/status']);
          });
        })
        .catch(error => {});
    });
  }
}
