import {
  Model
} from './model';
import {
  PostModel
} from './post';
import {
  CommunityPostModel
} from './community';
import {
  CourseModel
} from './course';

export class NotificationModel extends Model {
  public rows: any[];
  public id?: number;
  public isRead?: boolean;
  public type?: string;
  public message?: string;
  public createdAt?: string;
  public updatedAt?: string;
  public subjectId?: number;
  public postId?: number;
  public post?: PostModel;
  public postv1?: CommunityPostModel;
  public course?: CourseModel;
  public subject?: SubjectModel;

  public init (): void {}
}

export class SubjectModel extends Model {
  public name?: string;
  public id?: number;
  public firstName?: string;
  public lastName?: string;
  public password?: string;
  public email?: string;
  public language?: string;
  public aboutMe?: string;
  public accomplishments?: string;
  public token?: string;
  public tokenActiveDate?: string;
  public isSuspended?: boolean;
  public profilePicture?: string;
  public socialImage?: string;
  public profilePrivacy?: string;
  public protectPost?: string;
  public facebookId?: number;
  public linkedinId?: number;
  public googleId?: number;
  public schoolName?: string;
  public birthDate?: string;
  public city?: string;
  public gender?: string;
  public role?: string;
  public company?: string;
  public institutionName?: string;
  public yearOfIncorporation?: string;
  public website?: string;
  public createdAt?: string;
  public updatedAt?: string;
  public userTypeId?: number;
  public userPrivacyId?: number;
  public campusId?: number;

  public init (): void {}
}
