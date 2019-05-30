import {
  Injectable
} from '@angular/core';
import {
  HttpParams
} from '@angular/common/http';
import {
  ApiService
} from '../api.service';
import {
  IResponse, AdvanceSearchModel, UserModel
} from '../../app/shared/models';
import {
  AdvanceSearchFactory, UserFactory
} from '../../app/shared/models/factory';

@Injectable()
export class AdvanceSearchService extends ApiService {
  public options = {};
  public baseURI = 'advance-search';
  public baseURIPlural = 'advance-search';

  public promiseGetAllSearchedPosts (keyword: string, limit: number = 10, offset: number = 0): Promise<AdvanceSearchModel[]> {
    let params = new HttpParams()
      .set('keyword', keyword.toString())
      .set('limit', limit.toString())
      .set('offset', offset.toString());

      this.options = {
        params: params
      };

    return this.promiseGetAllResponseData(`post`)
      .then((response: IResponse) => {
        return AdvanceSearchFactory.createManyPosts(response.data);
      });
  }

  public promiseGetAllSearchedUsers (lastName: string, campusName: string = '',
    limit: number = 10, offset: number = 0): Promise<UserModel[]> {
    let params = new HttpParams()
      .set('lastName', lastName.toString())
      .set('campusName', campusName.toString())
      .set('limit', limit.toString())
      .set('offset', offset.toString());

      this.options = {
        params: params
      };

    return this.promiseGetAllResponseData(`user`)
      .then((response: IResponse) => {
        return UserFactory.createMany(response.data);
      });
  }
}
