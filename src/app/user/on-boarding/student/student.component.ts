import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  UserModel,
  UserTypeModel,
  UserStudyLevelModel,
  CourseModel
} from '../../../shared/models';
import {
  UserApiService,
  CourseApiService
} from '../../../../services/api';
import {
 UserService, MessageNotificationService, NotificationTypes
} from '../../../../services';
import {
  OnBoardingEmitter
} from '../../../shared/emitter';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'user-on-boarding-student-component',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class UserOnboardingStudentComponent implements OnInit {
  constructor (
    private userApiService: UserApiService,
    private courseApiService: CourseApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  protected user: UserModel = new UserModel();
  protected userStudyLevels: UserStudyLevelModel[] = [];
  protected courses: UserStudyLevelModel[] = [];
  protected btnClicked: boolean = false;

  public ngOnInit (): void {
    this.getCourses();
    this.route.data
    .subscribe((data: any) => {
      OnBoardingEmitter
      .onBoardingCurrentRoute()
      .emit(data.step);
    });
  }

  private getCourses (): void {
    this.courseApiService.promiseGetAllCourses()
      .then((courses: CourseModel[]) => {
        this.courses = courses;
      })
      .catch(() => {});
  }

  protected onSubmit (): void {
    this.btnClicked = true;
    this.userApiService.promiseGetType('student')
      .then((userType: UserTypeModel) => {
        this.user.userTypeId = userType.id;
        this.btnClicked = false;

        return this.userApiService.promiseUpdateOnboardingDetails(this.user);
      })
      .then(() => {
        this.router.navigate(['/user/on-boarding/status/student/interest']);
      })
      .catch((error) => {
        console.log(error);
        this.errorMessage(error);
        this.btnClicked = false;
      });
  }

  private errorMessage (error): void {
    MessageNotificationService.show({
      notification: {
        id: 'on-boarding-status',
        message: 'Cannot continue',
        instruction: this.user.courseIds.length === 0 ? 'Please fill out the fields.' : error.error.status_message
      }
    },
    NotificationTypes.Warning);
  }

  protected onChangeCourse (value: number): void {
    this.user.courseIds.push(value);
  }

  protected onChangeGender (value: string): void {
    this.user.gender = value;
  }
}
