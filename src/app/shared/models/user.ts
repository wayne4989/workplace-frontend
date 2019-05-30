import {
  Model
} from './model';
import {
  CourseModel
} from './course';

export class UserModel extends Model  {
  public id?: number;
  public firstName: string;
  public lastName: string;
  public name?: string;
  public confirmPassword?: string;
  public password: string;
  public email: string;
  public language: string;
  public aboutMe: string;
  public accomplishments: string;
  public token: string;
  public tokenActiveDate: Date;
  public isSuspended: boolean;
  public profilePicture: string;
  public profilePrivacy: boolean;
  public protectPost: boolean;
  public userPrivacyId: number;
  public facebookId: string;
  public linkedinId: string;
  public googleId: string;
  public schoolName: string;
  public birthDate: Date;
  public city: string;
  public gender: string;
  public role: string;
  public company: string;
  public institutionName: string;
  public yearOfIncorporation: Date;
  public website: string;
  public course: CourseModel;
  public userStudyLevelId?: number;
  public userTypeId?: number;
  public courseIds?: Array<number> = [];
  // use as an holder for saving user subInterest
  public subInterestIds: number[] = [];
  public isUserAlreadyFollowed: boolean;
  public isAlreadyFollowed: boolean;

  public init (): void {}
}

export class UserStudyLevelModel extends Model {
  public id?: number;
  public code: string;
  public name: string;

  public init (): void {}
}

export class UserTypeModel extends Model {
  public id?: number;
  public code: string;
  public name: string;

  public init (): void {}
}

export class FollowUser extends Model {
  public recipientId: number;

  public init (): void {}
}
