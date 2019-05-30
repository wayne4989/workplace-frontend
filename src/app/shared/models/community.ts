import {
  Model
} from './model';

export class CommunityPostModel extends Model {
  public courseId: number;
  public message: string;
  public area: string;
	public type: string;
  public attachments: String[];
  public isUserFollowCommunityQuestion: boolean;
  public init (): void {
    this.setBlankDataStructure ({
      message: null,
      attachments: [],
      isUserFollowCommunityQuestion: false
    });
  }
}

export class CommunityAnswerQuestionModel extends Model {
  public id?: number;
  public questionId: number;
  public comment: String;
  public courseId: number;
  public quoteReplyId?: number;
  public tagUserId?: number;

  public init (): void {
    this.setBlankDataStructure ({
      id: undefined,
      comment: null
    });
  }
}

export class PrivateCommunityModel extends Model {
	public name: string;
	public institutionName: string;
  public communityUsers: String[] = [];

  public init (): void {
    this.setBlankDataStructure ({
      id: undefined,
      comment: null
    });
  }
}
