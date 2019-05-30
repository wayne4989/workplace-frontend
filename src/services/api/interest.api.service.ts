import {
  Injectable
} from '@angular/core';
import {
  ApiService
} from '../api.service';
import {
  SubInterestModel,
  InterestCategoryModel,
  IResponse
} from '../../app/shared/models';
import {
  InterestFactory
} from '../../app/shared/models/factory';

@Injectable()
export class InterestApiService extends ApiService {
  public options = {};
  public baseURI = 'interest';
  public baseURIPlural = 'interests';

  public promiseGetAllSubInterest (interestCategoryId: number): Promise<SubInterestModel[]> {
    this.cloneAbstractURIs();
    this.baseURIPlural = 'interest';
    return this.promiseGetAllResponseData(`${interestCategoryId}`)
      .then((response: IResponse) => {
        return InterestFactory.createManySubInterest(response.data);
      });
  }

  public promiseGetAllCategoryInterest (): Promise<InterestCategoryModel[]> {
    return this.promiseGetAllResponseData('')
      .then((response: IResponse) => {
        return InterestFactory.createManyCategoryInterest(response.data);
      });
  }

  public promiseCreateSubInterest (interestCategoryId, interest: SubInterestModel): Promise<SubInterestModel> {
    return this.promisePostModelData(`${interestCategoryId}`, interest)
      .then((response: IResponse) => {
        return InterestFactory.createSubInterest(response.data);
      });
  }
}
