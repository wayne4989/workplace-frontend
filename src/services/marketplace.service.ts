import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs/Observable';

@Injectable()
export class MarketPlaceService {
  constructor (private http: HttpClient) {}

  public getmarketplace (campusId: Number): Observable<Object> {
    return this.http.get(`campus/${campusId}/marketplace`);
  }

  public getcampusmarketplace (marketpaceId: Number): Observable<Object> {
    return this.http.get(`campus/marketplace/${marketpaceId}`);
  }
}
