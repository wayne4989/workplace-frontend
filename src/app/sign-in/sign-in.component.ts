import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UserModel
} from '../shared/models';
import {
  MessageNotificationService,
  NotificationTypes,
  TokenStore,
  UserService
} from '../../services';
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
  selector: 'sign-in-component',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor (
    private userApiService: UserApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  protected user: UserModel = new UserModel();

  protected onSignIn (isValid: boolean): void {
    if (!isValid) {
      return;
    }

    MessageNotificationService.show({
      notification: {
        id: 'sign-in-please-wait',
        message: 'Logging you in',
        instruction: 'Please wait...'
      }
    },
    NotificationTypes.Info);

    this.userApiService.promiseSignIn(this.user)
      .then((user: UserModel) => {
        UserService.setUser(user);
        TokenStore.setAccessToken(user.token);

        return this.router.navigate(['/home']);
      })
      .catch(error => {
        if (error.status === 400) {
          MessageNotificationService.show({
            notification: {
              id: 'sign-in-error',
              message: 'Unable to Login.',
              reason: error.error.status_message,
              instruction: 'Please correct the errors and try again.'
            }
          },
          NotificationTypes.Error);
        } else {
          MessageNotificationService.show({
            notification: {
              id: 'sign-in-error',
              message: 'Unable to Login.',
              reason: 'Some unexpected happened with the application.',
              instruction: 'Please try again, if the issue persists, please try refreshing your browser.'
            }
          },
          NotificationTypes.Error);
        }
      });
  }

  protected onSignInViaSocial (provider: string): void {
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
