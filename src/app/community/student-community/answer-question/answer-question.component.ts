import {
  Component,
  OnInit
} from '@angular/core';
import {
	ActivatedRoute,
	Router,
	Params
} from '@angular/router';
import {
	CommunityApiService
} from '../../../../services/api';
import {
	UserService
} from '../../../../services';
import {
	CommunityPostModel,
	CommunityAnswerQuestionModel
} from '../../../shared/models';
import {
	CryptoUtilities
} from '../../../shared/utilities';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material';
import {
  SharedCommunityPostReplyComponent
} from '../../../shared/modals';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  Location
} from '@angular/common';

@Component({
	selector: 'answer-question-component',
	templateUrl: './answer-question.component.html',
	styleUrls: ['./answer-question.component.scss']
})
export class  AnswerQuestionCommunityComponent implements OnInit  {
	constructor (
			private route: ActivatedRoute,
			private router: Router,
			private location: Location,
			private communityApiService: CommunityApiService,
      private dialog: MatDialog,
      private overlay: Overlay
	) {}

	private communityPost: CommunityPostModel;
	protected user = UserService.getUser();
	protected communityAnswer: CommunityAnswerQuestionModel = new CommunityAnswerQuestionModel();
	protected isUserAnsweringQuestion: Boolean = false;

	public ngOnInit (): void {
		this.route.params.subscribe((params) => {
			this.communityAnswer.courseId = parseInt(CryptoUtilities.decipher(params.courseId), 10);
			this.communityAnswer.questionId = parseInt(CryptoUtilities.decipher(params.id), 10);
			this.getQuestionDetails(this.communityAnswer.courseId, this.communityAnswer.questionId);
		});
	}

	private getQuestionDetails (courseId, questionId): void {
		this.communityApiService.promiseGetQuestionDetail(courseId, questionId)
		.then((responseData: CommunityPostModel) => {
			this.communityPost = responseData;
		});
	}

	protected onSubmit (formIsValid): void {
		if (formIsValid) {
			this.isUserAnsweringQuestion = true;

			this.communityApiService.promiseCreateAnswerToQuestion(this.communityAnswer)
				.then(() => {
					this.isUserAnsweringQuestion = false;
					this.communityAnswer.comment = '';
					this.getQuestionDetails(this.communityAnswer.courseId, this.communityAnswer.questionId);
				});
			}
	}
	protected onClickReplyLike (reply): void {
    if (reply) {
      this.communityApiService.promiseLikeCommunityPostReply(reply.id)
        .then(() => {
          let index = this.communityPost['reply'].findIndex((filter: any) => {
            return filter.id === reply.id;
          });
          if (index > -1 ) {
            if (this.communityPost['reply'][index].replyLike) {
              if (this.communityPost['reply'][index].replyLike && this.communityPost['reply'][index].replyLike[0] === undefined) {
                this.communityPost['reply'][index].replyLike = [{
                  replyCount: 0
                }];
              }
            }
            this.communityPost['reply'][index].replyLike[0].replyCount += 1;
          }
        }).catch((error) => {
        console.error('error', error);
      });
    }
  }
  protected onDeletePostReply (replyId): void {
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
  protected onClickCommentDetail (reply): void {
    let dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'post-comment-detail-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {
      reply: reply,
      communityPost: this.communityPost,
      route: this.route,
      user: this.user,
      courseId: this.communityAnswer.courseId,
      questionId: this.communityAnswer.questionId};
    this.dialog.open(SharedCommunityPostReplyComponent, dialogConfig);
  }

  protected onDeletePost (postId: number): void {
    // delete here the post
    this.communityApiService.promiseRemoveCommunityPost(postId)
      .then(() => {
        this.location.back();
      }).catch((error) => {
      console.error('error', error);
    });
  }

  protected goToBack (): void {
    this.location.back();
  }
}

