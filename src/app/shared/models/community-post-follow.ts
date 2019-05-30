import {Model} from './model';

export class CommunityPostFollow extends Model {
  public postId: number;
  public courseId: number;

  public init (): void {
    this.setBlankDataStructure ({
      postId: null,
      courseId: null,
    });
  }
}
