import {
  Component, EventEmitter,
  Input, Output,
  SimpleChanges
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  PostModel,
  UserModel,
  CampusPostModel,
  CampusCourseFeedPostModel,
  CampusClassPostModel
} from '../../models';
import {
  PostApiService,
  CampusApiService
} from '../../../../services/api';
import {
  PostEmitter
} from '../../emitter';
import {
  CryptoUtilities
} from '../../../shared/utilities';
import {
  UserService,
} from '../../../../services';
import {
  SharedImagePreviewComponent,
  SharedPostDetailModalComponent
} from '../../modals';

@Component({
  selector: 'shared-post-component',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class SharedPostComponent {
  constructor (
    private postApiService: PostApiService,
    private campusApiService: CampusApiService,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  @Input() protected posts: Array<PostModel|CampusPostModel|CampusCourseFeedPostModel|CampusClassPostModel> = [];
  @Input() protected route: {
    name: string,
    campusId?: number,
    campusFreshersFeedId?: number,
    campusCourseFeedId?: number,
    campusClassId?: number
  } = {name: 'home'};
  @Input() protected user: UserModel;
  @Output() protected loadRecord = new EventEmitter();
  protected btnLoadMoreText = 'Load More';
  protected notPostMessage: string;
  private dialogRef: MatDialogRef<SharedImagePreviewComponent>;
  private limit = 5;
  private offset = 0;
  protected userJustVoted: boolean = false;
  protected isLoadingMorePosts: boolean = false;

  public ngOnInit (): void {
    this.getSharedPostSubscriber();
    this.postSavedSubcribers();
  }

  public ngOnChanges (changes: SimpleChanges): void {
    if (this.posts.length === 0 && changes.posts.previousValue) {
      this.notPostMessage = 'No Post Yet. Be the one to POST';
    }
  }

  private postSavedSubcribers (): void {
    PostEmitter.postSave()
      .subscribe((post: PostModel|CampusPostModel) => {
        this.posts.unshift(post);
      });
  }

  private getSharedPostSubscriber (): void {
    PostEmitter.postShare()
      .subscribe((post: PostModel|CampusPostModel) => {
        this.posts.unshift(post);
      });
  }

  protected onClickUserProfile (user): Promise<boolean> {
    let userId = CryptoUtilities.cipher(user.id);
    let currentLoginUser = UserService.getUser();

    if (user.id === currentLoginUser.id) {
      return this.router.navigate([`/profile`]);
    }

    return this.router.navigate([`/profile/${userId}`]);
  }

  protected onDeletePost (postId: number): void {
    // delete here the post
    this.postApiService.promiseRemovePost(postId)
      .then(() => {
        let index = this.posts.findIndex(filter => filter.id === postId);
        this.posts.splice(index, 1);
      })
      .catch(() => {});
  }

  protected onLoadMorePost (): void {
    this.isLoadingMorePosts = true;
    this.offset = this.posts.length;
    let campusId: any;

    switch (this.route.name) {
      case 'home':
        this.postApiService.promiseGetAllPost(this.limit, this.offset)
          .then((posts: PostModel[]) => {
            this.posts = this.posts.concat(posts);
            this.checkIfThereAreStillPostAvailable(posts);
            this.isLoadingMorePosts = false;
          });
        break;
      case 'campus':
        campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        this.campusApiService.promiseGetAllPost(campusId, this.limit, this.offset)
          .then((campusPost: CampusPostModel[]) => {
            this.posts = this.posts.concat(campusPost);
            this.checkIfThereAreStillPostAvailable(campusPost);
            this.isLoadingMorePosts = false;
          });
        break;
      case 'campusFreshersFeed':
        campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        let campusFreshersFeedId = parseInt(CryptoUtilities.decipher(this.route.campusCourseFeedId), 10);
        this.campusApiService.promiseGetAllFreshersFeedPost(campusId, campusFreshersFeedId, this.limit, this.offset)
          .then((campusPost: CampusPostModel[]) => {
            this.posts = this.posts.concat(campusPost);
            this.checkIfThereAreStillPostAvailable(campusPost);
            this.isLoadingMorePosts = false;
          });
        break;
      case 'campusCourseFeed':
        campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        let campusCourseFeedId = parseInt(CryptoUtilities.decipher(this.route.campusCourseFeedId), 10);
        this.campusApiService.promiseGetAllCoursePost(campusId, campusCourseFeedId)
          .then((campusPost: CampusPostModel[]) => {
            this.posts = this.posts.concat(campusPost);
            this.checkIfThereAreStillPostAvailable(campusPost);
            this.isLoadingMorePosts = false;
          });
        break;
      case 'campusClasses':
        campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        let campusClassId = parseInt(CryptoUtilities.decipher(this.route.campusClassId), 10);
        this.campusApiService.promiseGetAllClassPost(campusId, campusClassId, true, this.limit, this.offset)
          .then((campusPost: CampusPostModel[]) => {
            this.posts = this.posts.concat(campusPost);
            this.checkIfThereAreStillPostAvailable(campusPost);
            this.isLoadingMorePosts = false;
          });
        break;
    }
  }

  protected onClickPhoto (postAttachments, imageIndex): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'image-preview-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = { images: postAttachments, clickIndex: imageIndex, source: 'post' };
    this.dialogRef = this.dialog.open(SharedImagePreviewComponent, dialogConfig);
  }

  protected getPollPercentage (pollOptions): any {
    pollOptions.map(optionData => {
      optionData.sum = parseFloat(optionData.sum) + 1;
      optionData.average = (optionData.count / optionData.sum) * 100;
      optionData.average = optionData.average.toFixed(2);

      return optionData;
    });
  }

  protected onPollVote (index, option, pollOptions): void {
    switch (this.route.name) {
      case 'home':
        this.postApiService.promiseVotePoll(option.id)
          .then(() => {
            pollOptions[index].count += 1;
            this.getPollPercentage(pollOptions);
            this.userJustVoted = true;
          })
          .catch(() => {});
        break;
      case 'campus':
      case 'campusFreshersFeed':
      case 'campusCourseFeed':
      case 'campusClasses':
        this.campusApiService.promiseVotePoll(option.id)
          .then(() => {
            pollOptions[index].count += 1;
            this.getPollPercentage(pollOptions);
          })
          .catch(() => {});
        break;
    }
  }

  private checkIfThereAreStillPostAvailable (posts: PostModel[]|CampusPostModel[]): void {
    if (posts.length === 0) {
      this.btnLoadMoreText = 'No More Posts To Show';
    }
  }

  protected trimStory (message, maxCharacters): string {
    let trimmedString = message.substr(0, maxCharacters);
    return trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))) + '...';
  }

  protected onClickCommentDetail (post): void {
    let dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'post-comment-detail-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {post: post, route: this.route, user: this.user};
    this.dialog.open(SharedPostDetailModalComponent, dialogConfig);
  }

  public ngOnDestroy (): void {
    PostEmitter.removeSubscriber(PostEmitter.getPostSaveName());
    PostEmitter.removeSubscriber(PostEmitter.getPostSaveName());
  }
  protected loadPost (): void {
    this.loadRecord.emit();
  }
}
