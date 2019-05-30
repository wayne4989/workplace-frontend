import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpResponse
} from '@angular/common/http';
import {
  Observable
} from 'rxjs/Observable';

@Injectable()
export class NotificationService {
  constructor (private http: HttpClient) {}

  public getNotifications (start: number, size: number): Observable<any> {
    return this.http.get<any>(`notifications/${start}/${size}`);
  }

  public getMessages (start: number, size: number): Observable<any> {
    return this.http.get<any>(`message/headers/${start}/${size}`);
  }
}
