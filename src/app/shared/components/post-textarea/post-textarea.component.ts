import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import { NgxLinkifyjsService, Link, LinkType, NgxLinkifyOptions } from 'ngx-linkifyjs';
import {
  EmitterService
} from '../../emitter/emitter.component';
import {
  PostEmitter
} from '../../emitter';
import {
  IResponse,
  PostModel,
  PostPollModel,
  CampusPostModel,
  CampusFreshersFeedPostModel,
  CampusCourseFeedPostModel,
  CampusClassPostModel
} from '../../models';
import {
  PostApiService
} from '../../../../services/api';
import {
  CampusApiService
} from '../../../../services/api';
import {
  MessageNotificationService,
  NotificationTypes
} from '../../../../services';
import {
  CryptoUtilities
} from '../../utilities';
import * as _ from 'lodash';
declare let swal: any;

@Component({
  selector: 'shared-post-textarea-component',
  templateUrl: './post-textarea.component.html',
  styleUrls: ['./post-textarea.component.scss']
})

export class SharedPostTextareaComponent {
  constructor (
    private postApiService: PostApiService,
    private campusApiService: CampusApiService,
    private activatedRoute: ActivatedRoute,
    private linkifyService: NgxLinkifyjsService
  ) {
    this.post.postPoll = new PostPollModel();
  }

  private post: PostModel = new PostModel();
  private postPoll: PostPollModel = new PostPollModel();
  private campusPost: CampusPostModel = new CampusPostModel();
  private campusFreshersFeedPost: CampusFreshersFeedPostModel = new CampusFreshersFeedPostModel();
  private campusCourseFeedPost: CampusCourseFeedPostModel = new CampusCourseFeedPostModel();
  private campusClassPost: CampusClassPostModel = new CampusClassPostModel();
  private campusId: number;
  protected isToogleUploadComponentVisible: boolean = false;
  protected isButtonDisabledOnSubmit: boolean = false;
  protected typePost: string = 'Post';
  @Input() protected postMenu: boolean = true;
  @Input() protected pollMenu: boolean = true;
  @Input() protected shareMenu: boolean = true;
  @Input() protected askAQuestionMenu: boolean = true;
  @Input() protected route: {
    name: string,
    campusId?: number,
    campusFreshersFeedId?: number,
    campusCourseFeedId?: number,
    campusClassId?: number
  } = { name: 'home' };
  protected textAreaIsExpanded: boolean = false;
  private foundLinks: Link[] = [];
  private linkPreviewData: any[] = [];
  public ngOnInit (): void {
    this.post.postPoll.duration = 1;
  }

  protected onAddPost (): any {
    if (!this.post.message) {
      return MessageNotificationService.show({
        notification: {
          id: 'shared-post-textarea-message',
          message: 'Cannot Post',
          instruction: 'Please add a message.'
        }
      },
        NotificationTypes.Error);
    }

    if (this.isToogleUploadComponentVisible) {
      return PostEmitter.uploadImages().emit();
    }

    return this.postMessage();
  }

  protected onUploadComplete (attachments): void {
    switch (this.route.name) {
      case 'home':
        this.post.attachments = attachments;
        break;
      case 'campus':
        this.campusPost.attachments = attachments;
        break;
      case 'campusFreshersFeed':
        this.campusFreshersFeedPost.attachments = attachments;
        break;
      case 'campusCourseFeed':
        this.campusCourseFeedPost.attachments = attachments;
        break;
      case 'campusClasses':
        this.campusClassPost.attachments = attachments;
        break;
    }
    this.postMessage(true);
  }

  protected postMessage (isWithAttachments = false): void {
    // basically post-text-are-component will be use in the
    // campus route so basically we need an identifier to tell
    // if we are in the home or campus route that is
    // the use of this.route @Input
    switch (this.route.name) {
      case 'home':
        this.isToogleUploadComponentVisible = false;
        this.postApiService.promiseCreatePost(this.post)
          .then((postModel: PostModel) => {
            PostEmitter.postSave()
              .emit(postModel);
            // this will set the createPost call the setBlankDataStructure
            this.post.init();
            this.isButtonDisabledOnSubmit = false;
            this.linkPreviewData = [];
          })
          .catch(error => {
            this.isButtonDisabledOnSubmit = false;
          });
        break;
      case 'campus':
        this.campusPost.assimilate({
          message: this.post.message,
          campusPostPoll: this.post.postPoll
        });
        this.campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        this.campusApiService.promiseCreatePost(this.campusId, this.campusPost)
          .then((campusPost: CampusPostModel) => {
            PostEmitter.postSave()
              .emit(campusPost);
            this.campusPost.init();
            this.post.init();
          })
          .catch(error => { });
        break;
      case 'campusFreshersFeed':
        let campusFreshersFeedId = parseInt(CryptoUtilities.decipher(this.route.campusFreshersFeedId), 10);
        this.campusFreshersFeedPost.assimilate({
          message: this.post.message,
          campusPostPoll: this.post.postPoll,
          campusFreshersFeedId: campusFreshersFeedId
        });
        this.campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        this.campusApiService.promiseCreatePost(this.campusId, this.campusFreshersFeedPost)
          .then((campusPost: CampusPostModel) => {
            PostEmitter.postSave()
              .emit(campusPost);
            this.campusFreshersFeedPost.init();
            this.post.init();
          })
          .catch(error => { });
        break;
      case 'campusCourseFeed':
        let courseId = parseInt(CryptoUtilities.decipher(this.route.campusCourseFeedId), 10);
        this.campusCourseFeedPost.assimilate({
          message: this.post.message,
          campusPostPoll: this.post.postPoll,
          courseId: courseId
        });
        this.campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        this.campusApiService.promiseCreatePost(this.campusId, this.campusCourseFeedPost)
          .then((campusPost: CampusPostModel) => {
            PostEmitter.postSave()
              .emit(campusPost);
            this.campusFreshersFeedPost.init();
            this.post.init();
          })
          .catch(error => { });
        break;
      case 'campusClasses':
        let classId = parseInt(CryptoUtilities.decipher(this.route.campusClassId), 10);
        this.campusClassPost.assimilate({
          message: this.post.message,
          campusPostPoll: this.post.postPoll,
          classId: classId
        });
        this.campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        this.campusApiService.promiseCreatePost(this.campusId, this.campusClassPost)
          .then((campusPost: CampusPostModel) => {
            PostEmitter.postSave()
              .emit(campusPost);
            this.campusFreshersFeedPost.init();
            this.post.init();
          })
          .catch(error => { });
        break;
    }
  }

  protected onClickWhichTypeIsSelected (type): void {
    this.typePost = type;
  }

  protected onAddPollOption (): void {
    if (this.postPoll.options.length === 4) {
      MessageNotificationService.show({
        notification: {
          id: 'cannot-add-more-option',
          message: 'Cannot add more option',
          instruction: 'Only four (4) options are allowed.'
        }
      },
        NotificationTypes.Warning);
    } else {
      this.postPoll.options.push('');
    }
  }

  protected onAddPoll (): any {
    if (!this.post.postPoll.question) {
      this.onAddPostErrorNotification('Please fill in the form.');
      return;
    }

    if (this.post.postPoll.duration <= 0) {
      this.onAddPostErrorNotification('Poll duration must be at least 1 (one) day.');
      this.post.postPoll.duration = 1;
      return;
    }

    return this.createPostPoll();
  }

  private onAddPostErrorNotification (instruction): MessageNotificationService {
    return MessageNotificationService.show({
      notification: {
        id: 'shared-post-textarea-message',
        message: 'Cannot Post ' + this.typePost,
        instruction: instruction
      }
    },
      NotificationTypes.Error);
  }

  private getLinksFromTextarea = () => {
    this.foundLinks = this.linkifyService.find(this.post.message);
    this.linkPreviewData = [];
    this.foundLinks.forEach(link => {
      if (link.type === 'url') {
        if ((_.findIndex(this.linkPreviewData, ['url', link.href])) === -1) {
          this.postApiService.promiseGetJsonForLinkPreview(encodeURIComponent(link.href))
            .then((res: any) => {
              this.linkPreviewData.push(res.data);
              this.post.linkPreview = res.data;
            });
        }
      }
    });
  }

  private createPostPoll (): void {
    this.post.postPoll.options = this.post.postPoll.options.filter(option => option.trim() !== '');
    switch (this.route.name) {
      case 'home':
        this.postApiService.promiseCreatePostPoll(this.post)
          .then((post: PostModel) => {
            PostEmitter.postSave()
              .emit(post);
            this.postPoll.init();
            this.post.postPoll.init();
          })
          .catch(error => {
            console.log('poll error', error);
            this.onAddPostErrorNotification(error.error.status_message);
          });
        break;
      case 'campus':
        this.campusPost.assimilate({
          campusPostPoll: this.post.postPoll
        });
        this.campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        this.campusApiService.promiseCreatePostPoll(this.campusId, this.campusPost)
          .then((campusPost: CampusPostModel) => {
            PostEmitter.postSave()
              .emit(campusPost);
            this.postPoll.init();
            this.post.postPoll.init();
          })
          .catch(error => { });
        break;
      case 'campusFreshersFeed':
        let campusFreshersFeedId = parseInt(CryptoUtilities.decipher(this.route.campusFreshersFeedId), 10);
        this.campusPost.assimilate({
          campusFreshersFeedId: campusFreshersFeedId,
          campusPostPoll: this.post.postPoll
        });
        this.campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        this.campusApiService.promiseCreatePostPoll(this.campusId, this.campusPost)
          .then((campusPost: CampusPostModel) => {
            PostEmitter.postSave()
              .emit(campusPost);
            this.postPoll.init();
            this.post.postPoll.init();
          })
          .catch(error => { });
        break;
      case 'campusCourseFeed':
        let courseId = parseInt(CryptoUtilities.decipher(this.route.campusCourseFeedId), 10);
        this.campusPost.assimilate({
          courseId: courseId,
          campusPostPoll: this.post.postPoll
        });
        this.campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        this.campusApiService.promiseCreatePostPoll(this.campusId, this.campusPost)
          .then((campusPost: CampusPostModel) => {
            PostEmitter.postSave()
              .emit(campusPost);
            this.postPoll.init();
            this.post.postPoll.init();
          })
          .catch(error => { });
        break;
      case 'campusClasses':
        let classId = parseInt(CryptoUtilities.decipher(this.route.campusClassId), 10);
        this.campusPost.assimilate({
          classId: classId,
          campusPostPoll: this.post.postPoll
        });
        this.campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        this.campusApiService.promiseCreatePostPoll(this.campusId, this.campusPost)
          .then((campusPost: CampusPostModel) => {
            PostEmitter.postSave()
              .emit(campusPost);
            this.postPoll.init();
            this.post.postPoll.init();
          })
          .catch(error => { });
        break;
    }
  }

  protected onAddStory (): void {
    console.log('Story', this.post);
    if (!this.post.title) {
      this.onAddPostErrorNotification('Please fill in the form.');
      return;
    }

    if (!this.post.message) {
      this.onAddPostErrorNotification('Story must not be empty.');
      this.post.postPoll.duration = 1;
      return;
    }

    return this.createPostStory();
  }

  private createPostStory (): void {
    switch (this.route.name) {
      case 'home':
        this.postApiService.promiseCreatePostStory(this.post)
          .then((post: PostModel) => {
            PostEmitter.postSave()
              .emit(post);
            this.post.init();
          })
          .catch(error => {
            console.log('story error', error);
            this.onAddPostErrorNotification(error.error.status_message);
          });
        break;
      case 'campus':
        break;
      case 'campusFreshersFeed':
        break;
      case 'campusCourseFeed':
        break;
      case 'campusClasses':
        break;
    }
  }

  public ngOnDestroy (): void {
    PostEmitter.removeSubscriber(PostEmitter.getUploadCompleteName());
  }
}
