import {
  Component
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  UserModel,
  UserTypeModel
} from '../../../shared/models';
import {
  UserApiService
} from '../../../../services/api';
import {
  OnBoardingEmitter
} from '../../../shared/emitter';
import {
 UserService
} from '../../../../services';

@Component({
  selector: './organisation-component',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class UserOnboardingOrganisationComponent {
  constructor (
    private userApiService: UserApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  protected user: UserModel = new UserModel();
  private currentUser: UserModel = UserService.getUser();

  public ngOnInit (): void {
    this.route.data
    .subscribe((data: any) => {
      OnBoardingEmitter
      .onBoardingCurrentRoute()
      .emit(data.step);
    });
  }

  protected onSubmit (): void {
    this.userApiService.promiseGetType('organizationInstitution')
      .then((userType: UserTypeModel) => {
        this.user.userTypeId = userType.id;
        this.currentUser.userTypeId = userType.id;
        this.currentUser.assimilate(this.user);
        return this.userApiService.promiseUpdateOnboardingDetails(this.user);
      })
      .then(() => {
        this.router.navigate(['/user/on-boarding/status/student/interest']);
      })
      .catch(() => {});
  }
}
