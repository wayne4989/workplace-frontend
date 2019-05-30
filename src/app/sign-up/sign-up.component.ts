import {
  Component
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  UserModel
} from '../shared/models';
import {
  MessageNotificationService,
  NotificationTypes,
  TokenStore,
  UserService
} from  '../../services';
import {
  UserApiService
} from '../../services/api';
import {
  AuthService,
  SocialUser,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedInLoginProvider
} from 'angularx-social-login';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'sign-up-component',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor (
    private userApiService: UserApiService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  protected hasAgreed: boolean = false;
  protected user: UserModel = new UserModel();

  protected onSignUp (): void {
    const splitNames = this.user.name.split(' ');
    this.user.assimilate({
      firstName: splitNames[0],
      lastName: splitNames[1]
    });

    if (this.hasAgreed) {
      MessageNotificationService.show({
        notification: {
          id: 'sign-up-please-wait',
          message: 'Sign-up',
          instruction: 'Please wait...'
        }
      },
      NotificationTypes.Info);

      this.userApiService.promiseRegister(this.user)
        .then(() => {
          return MessageNotificationService.show({
            notification: {
              id: 'sign-up-success',
              message: 'Sign-up.. Success!!!',
              instruction: 'Redirecting...'
            }
          },
          NotificationTypes.Success);
        })
        .then(notificationState => {
          if (notificationState) {
            notificationState.subscribe(() => {
              this.router.navigate(['thank-you-for-signing'],  {relativeTo: this.route});
            });
          }
        })
        .catch(error => {
          if (error.status === 400) {
            MessageNotificationService.show({
              notification: {
                id: 'sign-up-error',
                message: 'Unable to Sign-up.',
                reason: error.error.status_message,
                instruction: 'Please correct the errors and try again.'
              }
            },
            NotificationTypes.Error);
          } else {
            MessageNotificationService.show({
              notification: {
                id: 'sign-up-error',
                message: 'Unable to Sign-up.',
                reason: 'Some unexpected happened with the application.',
                instruction: 'Please try again, if the issue persists, please try refreshing your browser.'
              }
            },
            NotificationTypes.Error);
          }
        });
    }
  }

  protected onSignUpViaSocial (provider: string): void {
    let socialProvider = this.getSocialProviderId(provider);
    this.authService.signIn(socialProvider)
      .then((response: SocialUser) => {
        const name = response.name.split(' ');
        this.user.assimilate({
          email: response.email,
          firstName: name[0],
          lastName: name[1],
          image: response.photoUrl,
          provider: response.provider.toLowerCase(),
          uid: response.id
        });

        // check if the email is undefined
        // meaning the email is not yet verified
        if (!response.email) {
          let error = {
            reason: 'Please validate email',
            error: 401
          };

          throw new Error(JSON.stringify(error));
        }

        return this.userApiService.promiseRegisterViaSocialMedia(this.user);
      })
      .then((user: UserModel) => {
        UserService.setUser(user);
        TokenStore.setAccessToken(user.token);
        // check if we have userTypeId
        // meaning this user must on the onboarding
        if (!user.userTypeId) {
          this.router.navigate(['/user/on-boarding/status']);
          return;
        }

        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  private getSocialProviderId (provider): string {
    if (provider === 'facebook') {
      return FacebookLoginProvider.PROVIDER_ID;
    } else if (provider === 'google') {
      return GoogleLoginProvider.PROVIDER_ID;
    } else if (provider === 'linkedin') {
      return LinkedInLoginProvider.PROVIDER_ID;
    }

    return null;
  }
}
