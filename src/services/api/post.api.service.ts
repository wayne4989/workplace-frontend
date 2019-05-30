import {
  Injectable
} from '@angular/core';
import {
  HttpParams
} from '@angular/common/http';
import {
  ApiService
} from '../api.service';
import {
  PostModel,
  PostPollModel,
  PostReplyModel,
  ReportPostModel,
  SharePostModel,
  IResponse,
  PostRateModel
} from '../../app/shared/models';
import {
  PostFactory
} from '../../app/shared/models/factory';

@Injectable()
export class PostApiService extends ApiService {
  public options = {};
  public baseURI = 'post';
  public baseURIPlural = 'posts';

  public promiseGetAllPost (limit: number, offset: number): Promise<PostModel[]> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    this.options = {
      params: params
    };

    return this.promiseGetAllResponseData('')
      .then((response: IResponse) => {
        return PostFactory.createManyPost(response.data);
      });
  }

  public promiseGetPost (postId: number): Promise<PostModel> {
    return this.promiseGetResponseData(`${postId}`)
      .then((response: IResponse) => {
        return PostFactory.createPost(response.data);
      });
  }

  public promiseCreatePost (post: PostModel): Promise<PostModel> {
    return this.promisePostModelData('', post)
      .then((response: IResponse) => {
        return PostFactory.createPost(response.data);
      });
  }

  public promiseCreatePostPoll (post: PostModel): Promise<PostModel> {
    return this.promisePostModelData('poll', post)
      .then((response: IResponse) => {
        return PostFactory.createPost(response.data);
      });
  }

  public promiseVotePoll (postPollOptionId: number): Promise<IResponse> {
    return this.promisePostModelData(`poll/${postPollOptionId}`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseCreatePostStory (story: PostModel): Promise<PostModel> {
    return this.promisePostModelData('story', story)
      .then((response: IResponse) => {
        return PostFactory.createPost(response.data);
      });
  }

  public promiseCreatePostReply (postId: number, postReply: PostReplyModel): Promise<IResponse> {
    return this.promisePostModelData(`${postId}/reply`, postReply)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseCreatePostLike (postId: number): Promise<IResponse> {
    return this.promisePostModelData(`${postId}/like`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promisePageView (postId: number): Promise<IResponse> {
    return this.promisePostModelData(`${postId}/pageview`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseReportPost (postId: number, reportPost: ReportPostModel): Promise<IResponse> {
    return this.promisePostModelData(`${postId}/report`, reportPost)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseSharePost (postId: number, sharePost: SharePostModel): Promise<PostModel> {
    return this.promisePostModelData(`share/${postId}`, sharePost)
      .then((response: IResponse) => {
        return PostFactory.createPost(response.data);
      });
  }

  public promisePostTo (post: PostModel): Promise<PostModel> {
    return this.promisePostModelData('', post)
      .then((response: IResponse) => {
        return PostFactory.createPost(response.data);
      });
  }

  public promisePostRate (postId, rate: PostRateModel): Promise<IResponse> {
    return this.promisePostModelData(`${postId}/rating`, rate)
      .then((response: IResponse) => {
        return response;
      });
  }


  public promiseRemovePostLike (postId: number): Promise<IResponse> {
    return this.promiseRemoveData(`${postId}/like`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseRemovePost (postId: number): Promise<IResponse> {
    return this.promiseRemoveData(`${postId}`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseRemovePostReply (replyId: number): Promise<IResponse> {
    return this.promiseRemoveData(`reply/${replyId}`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }
  public promiseCreatePostReplyLike (postReplyId: number): Promise<IResponse> {
    return this.promisePostModelData(`reply/${postReplyId}/like`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }
  public promiseRemovePostReplyLike (postReplyId: number): Promise<IResponse> {
    return this.promiseRemoveData(`reply/${postReplyId}/like`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }
  public promisePostReplyRate (postReplyId, rate: PostRateModel): Promise<IResponse> {
    return this.promisePostModelData(`reply/${postReplyId}/rating`, rate)
      .then((response: IResponse) => {
        return response;
      });
  }
  public promiseGetJsonForLinkPreview (url: string): Promise<IResponse> {
    return this.promiseGetJsonDataForLinkPreview(`link-preview/${encodeURI(url)}`)
      .then((res: IResponse) => {
        return res;
      });
  }
}
