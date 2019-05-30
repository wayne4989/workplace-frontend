import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  PostModel,
  IResponse
} from '../../models';
import {
  PostApiService
} from '../../../../services/api';

@Component({
  selector: 'app-view-post-modal-component',
  templateUrl: './view.post.modal.component.html',
  styleUrls: ['./view.post.modal.component.scss']
})
export class SharedViewPostModalComponent implements OnInit {
  constructor (@Inject (MAT_DIALOG_DATA)
  private post: PostModel,
  private postApiService: PostApiService
) {}

  public ngOnInit (): void {
    this.postApiService.promisePageView(this.post.id)
      .then((response: IResponse) => {})
      .catch(error => {});
  }
}
