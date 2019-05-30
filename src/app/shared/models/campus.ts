import {
  Model
} from './model';
import {
  PostReplyModel,
  PostPollModel
} from './post';
import {
  UserModel
} from './user';
import {
  IAttachment
} from './interface';

export class CampusModel extends Model {
  public id?: number;
  public name: string;
  public email: string;
  public password: string;

  public init (): void {}
}

export class CampusPostModel extends Model {
  public id?: number;
  public createdAt: Date;
  public message: string;
  public likeCount: number;
  public isUserLike: number;
  public isUserPostLike: number;
  public pageviewCount: number;
  public campusPostReply: Array<PostReplyModel>;
  public postShare: CampusPostModel;
  public postReply: Array<PostReplyModel>;
  public ratingCount: number;
  public roundedRating?: number;
  public attachments: String[];
  // use as a virtual holder for postPoll
  public campusPostPoll: PostPollModel;

  public init (): void {
    this.setBlankDataStructure({
      id: undefined,
      message: undefined,
      attachments: []
    });
  }
}

export class CampusPostReplyModel extends Model {
  public id?: number;
  public comment: string;
  public user?: UserModel;
  public hideComment?: boolean;
  public postPollOptionId?: number;
  public createdAt?: Date;

  public init (): void {
    this.setBlankDataStructure({
      id: undefined,
      comment: undefined,
      user: undefined,
      hideComment: undefined,
      postPollOptionId: undefined,
      createdAt: undefined
    });
  }
}

export class CampusFreshersFeedPostModel extends CampusPostModel {
  // use as a virtual field for freshersFeed
  public campusFreshersFeedId: number;

  public init (): void {
    super.init();
    this.setBlankDataStructure({
      campusFreshersFeedId: undefined
    });
  }
}

export class CampusCourseFeedPostModel extends CampusPostModel {
  // use as a virtual field for courseFeed
  public courseId: number;

  public init (): void {
    super.init();
    this.setBlankDataStructure({
      courseId: undefined
    });
  }
}

export class CampusClassPostModel extends CampusPostModel {
  // use as a virtual field for courseFeed
  public classId: number;

  public init (): void {
    super.init();
    this.setBlankDataStructure({
      classId: undefined
    });
  }
}

export class CampusFreshersFeedModel extends Model {
  public id?: number;
  public campusId: number;
  public schoolYearStart: Date;
  public schoolYearEnd: Date;

  public init (): void {}
}

export class CampusCourseModel extends Model {
  public id?: number;
  public courseId: number;
  public campusId: number;

  public init (): void {}
}

export class CampusClassModel extends Model {
  public id?: number;
  public name: number;
  public campusCourseId: number;

  public init (): void {}
}

export class CampusStudentGroupModel extends Model {
  public id?: number;
  public name: string;
  public description: string;
  public adminEmail: string;
  public isConfirm?: boolean;
  public campusId?: number;
  public campusPrivacyId?: number = 1;
  public logo: string;
  public init (): void {}
}

export class CampusMarketplaceModel extends Model {
  public id?: number;
  public title: string;
  public email: string;
  public description: string;
  public phone: string;
  public location: string;
  public author: string;
  public edition: string;
  public price: number; // float
  public isConfirm: boolean;
  public attachments?: IAttachment[];

  public init (): void {}
}
