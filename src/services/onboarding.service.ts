import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs/Observable';
import {
  UserModel
} from '../app/shared/models';

@Injectable()
export class OnboardingService {
  constructor (private http: HttpClient) { }

  public saveSuggestedInterest (interestCategoryId: number, interestName: string): Observable<Object> {
    return this.http.post(`interest/${interestCategoryId}`, {interestName});
  }

  public deleteSuggestedInterest (interestId: Number): Observable<Object> {
    return this.http.delete(`interest/${interestId}`, {});
  }
}
