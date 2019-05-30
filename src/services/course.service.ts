// import {
//   Injectable
// } from '@angular/core';
// import {
//   HttpClient
// } from '@angular/common/http';
// import {
//   Observable
// } from 'rxjs/Observable';
// import * as _ from 'lodash';
//
// @Injectable()
// export class CourseService {
//   constructor (private http: HttpClient) {}
//
//   public getCourses (): Observable<Object> {
//     return this.http.get('courses');
//   }
//
//   public getInterest (): Observable<Object> {
//     return this.http.get('interest');
//   }
//
//   public getSubInterest (interestCategoryId): Observable<Object> {
//     return this.http.get(`interest/${interestCategoryId}`);
//   }
//
//   public getLevelOfStudy (): Observable<Object> {
//     return this.http.get('user/study-levels');
//   }
//
//   public getCountryCities (countryId: Number = 1): Observable<Object> {
//     return this.http.get(`cities/${countryId}`);
//   }
//
//   public getInterestCategories (): Observable<Object> {
//     return this.http.get('interest');
//   }
//
//   public getInterests (categoryId: Number): Observable<Object> {
//     return this.http.get(`interest/${categoryId}`);
//   }
// }

import {
  CourseModel
} from '../app/shared/models';

export class CourseService {
  private static course: CourseModel;

  public static setCourse (user: CourseModel): void {
    CourseService.course = user;
  }

  public static getCourse (): CourseModel {
    return CourseService.course;
  }
}
