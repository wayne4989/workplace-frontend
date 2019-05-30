import {
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';
import {
  UserService,
} from '../../../../services';
import {
  UserModel,
  CommunityPostModel,
  CommunityAnswerQuestionModel
} from '../../models';
import {
  CommunityApiService
} from '../../../../services/api';

@Component({
  selector: 'shared-community-post-reply-component',
  templateUrl: './community-post-reply.component.html',
  styleUrls: ['./community-post-reply.component.scss']
})
export class SharedCommunityPostReplyComponent {
  constructor (private communityApiService: CommunityApiService, private cdRef: ChangeDetectorRef) {}
  private user: UserModel = UserService.getUser();
  protected communityAnswer: CommunityAnswerQuestionModel = new CommunityAnswerQuestionModel();
  protected isUserCurrentlyCommenting = false;
  @Input() private communityPost: CommunityPostModel;
  @Input() private reply: any;
  @Input() private courseId: number;
  @Input() private questionId: number;

  public ngOnInit (): void {
    this.communityAnswer.courseId = this.courseId;
    this.communityAnswer.questionId = this.questionId;
    this.communityAnswer.tagUserId = this.user.id;
    this.communityAnswer.quoteReplyId = this.reply.id;
  }
  private getQuestionDetails (courseId, questionId): void {
    this.communityApiService.promiseGetQuestionDetail(courseId, questionId)
      .then((responseData: CommunityPostModel) => {
          this.communityPost = responseData;
          this.cdRef.detectChanges();
      });
  }
  private onCommunityPostReply (): void {
    this.isUserCurrentlyCommenting = true;
    this.communityApiService.promiseCreateAnswerToQuestion(this.communityAnswer)
      .then(() => {
        this.isUserCurrentlyCommenting = false;
        this.communityAnswer.comment = '';
        this.getQuestionDetails(this.communityAnswer.courseId, this.communityAnswer.questionId);
      });
  }
  private onDeletePostReply (replyId): void {
    if (replyId) {
      this.communityApiService.promiseRemoveCommunityPostReply(replyId)
        .then(() => {
          let index = this.communityPost['reply'].findIndex((filter: any) => {
            return filter.id === replyId;
          });
          if (index > -1 ) {
            this.communityPost['reply'].splice(index, 1);
          }
        }).catch((error) => {
        console.error('error', error);
      });
    }
  }
}
