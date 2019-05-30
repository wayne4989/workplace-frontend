import {
  AdvanceSearchModel
} from './advance-search';
import {
  UserModel
} from './user';
import {
  UserFactory
} from './user.factory';

export class AdvanceSearchFactory {
  public static createPost (data: any): AdvanceSearchModel {
    return <AdvanceSearchModel> (new AdvanceSearchModel ())
      .assimilate(data);
  }

  public static createManyPosts (data: Array<AdvanceSearchModel>): Array<AdvanceSearchModel> {
    return data.map(
      instanceData => AdvanceSearchFactory.createPost(instanceData),
    );
  }

  public static createManyUsers (data: Array<UserModel>): Array<UserModel> {
    return data.map(
      instanceData => UserFactory.create(instanceData),
    );
  }
}
