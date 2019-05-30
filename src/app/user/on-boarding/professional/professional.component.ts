import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  OnBoardingEmitter
} from '../../../shared/emitter';
import {
  UserApiService,
  CourseApiService
} from '../../../../services/api';
import {
  CourseModel,
  UserModel,
  UserTypeModel
} from '../../../shared/models';
import {
 UserService
} from '../../../../services';

@Component({
  selector: 'user-on-boarding-professional-component',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class UserOnboardingProfessionalComponent implements OnInit {
  constructor (
    private route: ActivatedRoute,
    private courseApiService: CourseApiService,
    private userApiService: UserApiService,
    private router: Router
  ) {}

  protected courses: CourseModel[];
  protected courseAdded: CourseModel[] = [];
  protected user: UserModel = new UserModel();
  private currentUser: UserModel = UserService.getUser();

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

  protected onChangeCourse (value: string): void {
    let count = this.courseAdded.filter(item => item.id === parseInt(value, 10));
    if (count.length === 0) {
      let course = this.courses.filter(item => item.id === parseInt(value, 10))[0];
      this.courseAdded.push(course);
    }

    this.user.courseIds = this.courseAdded.map(item => item.id);
  }

  protected removeCourseAdded (course): void {
    this.courseAdded = this.courseAdded.filter(item => item.id !== course.id);
    this.user.courseIds = this.courseAdded.map(item => item.id);
  }

  protected onSubmit (): void {
    console.log(this.user);
    this.userApiService.promiseGetType('professionals')
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
