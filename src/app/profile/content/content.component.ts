import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  UserApiService
} from '../../../services/api';
import {
  UserService
} from '../../../services';
import {
  PostModel,
  UserModel
} from '../../shared/models';

@Component({
  selector: 'profile-content-component',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ProfileContentComponent implements OnInit {
  constructor (private userApiService: UserApiService) {}

  @Input() protected user: UserModel;
  protected posts: PostModel[] = [];

  public ngOnInit (): void {
    this.getUserTimeline();
  }

  protected onShowPostDetailDialogComponent (): void {}

  private getUserTimeline (): void {
    this.userApiService.promiseGetTimeline(this.user.id)
      .then((posts: PostModel[]) => {
        this.posts = posts;
      })
      .catch(error => {});
  }
}

