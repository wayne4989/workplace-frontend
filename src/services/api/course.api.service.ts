import {
  Injectable
} from '@angular/core';
import {
  ApiService
} from '../api.service';
import {
  CourseModel,
  IResponse
} from '../../app/shared/models';
import {
  CourseFactory
} from '../../app/shared/models/factory';

@Injectable()
export class CourseApiService extends ApiService {
  public options = {};
  public baseURI = 'course';
  public baseURIPlural = 'courses';

  public promiseGetAllCourses (): Promise<CourseModel[]> {
    return this.promiseGetAllResponseData('')
      .then((response: IResponse) => {
        return CourseFactory.createMany(response.data);
      });
  }

  public promiseGetAllSubInterest (interestCategoryId: number): Promise<any> {
    return this.promiseGetAllResponseData('')
      .then((response: IResponse) => {
        return CourseFactory.createMany(response.data);
      });
  }
}
