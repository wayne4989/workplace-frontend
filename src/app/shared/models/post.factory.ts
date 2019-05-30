import {
  PostModel
} from './post';
import * as moment from 'moment';

export class PostFactory {
  public static createPost (data: any): PostModel {
    return <PostModel> (new PostModel ())
      .assimilate(data)
      .injectRelatedData(PostFactory.buildPostPollOptions);
  }

  public static createManyPost (data: Array<PostModel>): Array<PostModel> {
    return data.map(
      instanceData => PostFactory.createPost(instanceData),
    );
  }

  public static buildPostPollOptions (postModel: PostModel): PostModel {
    if (postModel.pollExpiration) {
      const now = moment();
      const expiration = moment(postModel.pollExpiration);
      const diff = expiration.diff(now);
      const diffDuration = moment.duration(diff);
      const hours = parseFloat(diffDuration.asHours().toString().split('.')[0]);
      const minutes = Math.round(parseFloat('0.' + diffDuration.asHours().toString().split('.')[1]) * 60);

      let durationDisplay: string = '';
      let hoursDisplay: string = '';
      let minutesDisplay: string = '';

      if (hours > 1) {
        hoursDisplay = `${hours} hours`;
      } else if (hours === 1) {
        hoursDisplay = `${hours} hour`;
      }

      hoursDisplay ? (durationDisplay += `${hoursDisplay} and `) : '';

      if (minutes > 1) {
        minutesDisplay = `${minutes} minutes`;
      } else if (minutes === 1) {
        minutesDisplay = `${minutes} minute`;
      }

      minutesDisplay ? (durationDisplay += `${minutesDisplay} left`) : '';

      postModel['pollDurationDisplay'] = `${durationDisplay}`;
    }

    return postModel;
  }
}
