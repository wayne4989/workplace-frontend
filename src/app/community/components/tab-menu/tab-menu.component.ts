import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserApiService
} from '../../../../services/api';
import {
  UserStudyLevelModel
} from '../../../shared/models';

@Component({
  selector: 'community-tab-menu-component',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class CommunityTabMenuComponent implements OnInit {
  constructor (private userApiService: UserApiService) {}

  protected useStudyLevels: Array<UserStudyLevelModel>;

  public ngOnInit (): void {
    this.getUserStudyLevels();
  }

  private getUserStudyLevels (): void {
    this.userApiService.promiseGetStudyLevels()
      .then((studyLevels: UserStudyLevelModel[]) => {
        this.useStudyLevels = studyLevels;
      })
      .catch(() => {});
  }
}
