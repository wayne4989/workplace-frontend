import {
  UserModel,
  UserStudyLevelModel,
  UserTypeModel
} from './user';

export class UserFactory {
  public static create (data: any): UserModel {
    return <UserModel> (new UserModel ())
      .assimilate(data);
  }

  public static createMany (data: UserModel[]): UserModel[] {
    return data.map(
      instanceData => UserFactory.create(instanceData),
    );
  }

  public static createManyStudyLevel (data: UserStudyLevelModel[]): UserStudyLevelModel[] {
    return data.map(
      instanceData => UserFactory.createStudyLevel(instanceData),
    );
  }

  public static createStudyLevel (data: any): UserStudyLevelModel {
    return <UserStudyLevelModel> (new UserStudyLevelModel ())
      .assimilate(data);
  }

  public static createType (data: any): UserTypeModel {
    return <UserTypeModel> (new UserTypeModel ())
      .assimilate(data);
  }
}
